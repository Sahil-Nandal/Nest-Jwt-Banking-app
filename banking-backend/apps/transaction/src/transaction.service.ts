import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs';

interface AccountServiceClient {
  getAccountByIdGrpc(data: { id: number }): Observable<{ id: number; balance: number; status: string }>;
  updateAccountBalanceGrpc(data: { id: number; amount: number; type: string }): Observable<{ success: boolean }>;
}

@Injectable()
export class TransactionService {
  private accountService: AccountServiceClient;

  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @Inject('ACCOUNT_SERVICE') private readonly client: ClientGrpc, // gRPC client for Account Service
  ) {}

  onModuleInit() {
    this.accountService = this.client.getService<AccountServiceClient>('AccountService');
  }

  async createTransaction(userId: number, accountId: number, amount: number, type: 'credit' | 'debit'): Promise<Transaction> {
    // Fetch account details using gRPC
    console.log("FE data ->", userId, accountId, amount, type)
    const account = await firstValueFrom(this.accountService.getAccountByIdGrpc({ id: accountId }));

    if (!account) {
      throw new NotFoundException('Account not found');
    }
    else{
      console.log("Account found!")
    }

    if (type === 'debit' && account.balance < amount) {
      throw new BadRequestException('Insufficient funds');
    }

    // Update the account balance using gRPC
    await firstValueFrom(this.accountService.updateAccountBalanceGrpc({ id: accountId, amount, type }));
    console.log("Transaction Done!")
    // Create and save the transaction
    const transaction = this.transactionRepository.create({ userId, accountId, amount, type });
    return await this.transactionRepository.save(transaction);
  }

  async getTransactionById(id: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({ where: { id } });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }

  async getTransactionsByUserId(userId: number): Promise<Transaction[]> {
    return await this.transactionRepository.find({ where: { userId } });
  }

  async getTransactionsByAccountId(accountId: number): Promise<Transaction[]> {
    return await this.transactionRepository.find({ where: { accountId } });
  }
}
