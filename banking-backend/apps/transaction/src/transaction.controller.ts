import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async createTransaction(@Body() body: { userId: number; accountId: number; amount: number; type: 'credit' | 'debit' }): Promise<Transaction> {
    console.log("inside createT controller")
    return await this.transactionService.createTransaction(body.userId, body.accountId, body.amount, body.type);
  }

  @Get(':id')
  async getTransactionById(@Param('id') id: number): Promise<Transaction> {
    return await this.transactionService.getTransactionById(id);
  }

  @Get('user/:userId')
  async getTransactionsByUserId(@Param('userId') userId: number): Promise<Transaction[]> {
    return await this.transactionService.getTransactionsByUserId(userId);
  }

  @Get('account/:accountId')
  async getTransactionsByAccountId(@Param('accountId') accountId: number): Promise<Transaction[]> {
    return await this.transactionService.getTransactionsByAccountId(accountId);
  }
}
