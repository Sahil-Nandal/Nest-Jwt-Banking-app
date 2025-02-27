import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { GrpcMethod } from '@nestjs/microservices';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  
  async createAccount(userId: number, accountNumber: number, balance: number): Promise<Account> {
    const existingAccount = await this.accountRepository.findOne({ where: { accountNumber } });
    if (existingAccount) {
      throw new BadRequestException('Account number already exists');
    }

    const newAccount = this.accountRepository.create({
      userId,
      accountNumber,
      balance
    });

    return await this.accountRepository.save(newAccount);
  }

  
  async getAccountByIdGrpc(id: number ) {
    console.log(`🔍 Fetching account with ID: ${id}`);

    const account = await this.accountRepository.findOne({ where: { id } });

    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }

    return account;
  }

  
  async getAccountById(id: number): Promise<Account> {
    const account = await this.accountRepository.findOne({ where: { id } });
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return account;
  }

  
  async getAccountByNumber(accountNumber: number): Promise<Account> {
    const account = await this.accountRepository.findOne({ where: { accountNumber } });
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return account;
  }

  
  async getAccountsByUserId(userId: number): Promise<Account[]> {
    console.log("inside service", userId);
    return await this.accountRepository.find({ where: { userId } });
  }

  
  async updateAccountStatus(accountNumber: number, status: string): Promise<Account> {
    const account = await this.getAccountByNumber(accountNumber);
    account.status = status;
    return await this.accountRepository.save(account);
  }

  async updateAccountBalance(id: number, balance: number): Promise<Account> {
    const account = await this.getAccountByNumber(id);
    account.balance = balance;
    return await this.accountRepository.save(account);
  }

  async updateAccountBalanceGrpc(accountNumber: number, amount: number, type: string): Promise<Account> {
    console.log("Inside UAB service!")
    const account = await this.getAccountByNumber(accountNumber);
    if(type == "credit"){
      account.balance = account.balance + amount;
    } 
    else {
      account.balance = account.balance - amount;
    }
    return await this.accountRepository.save(account);
  }

  
  async deleteAccount(accountNumber: number): Promise<void> {
    const account = await this.getAccountByNumber(accountNumber);
    await this.accountRepository.remove(account);
  }
}
