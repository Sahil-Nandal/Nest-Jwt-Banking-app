import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from './account.entity';
import { GrpcMethod } from '@nestjs/microservices';


@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  
  @Post()
  async createAccount(@Body() body: { userId: number; accountNumber: number }): Promise<Account> {
    return await this.accountService.createAccount(body.userId, body.accountNumber);
  }

  
  @Get(':id')
  async getAccountById(@Param('id') id: number): Promise<Account> {
    return await this.accountService.getAccountById(id);
  }

  @GrpcMethod('AccountService', 'GetAccountByIdGrpc') // Must match `account.proto`
  async getAccountByIdGrpc(@Param('id') id: number): Promise<Account> {
    return await this.accountService.getAccountByIdGrpc(id);
  }

  
  @Get('number/:accountNumber')
  async getAccountByNumber(@Param('accountNumber') accountNumber: number): Promise<Account> {
    return await this.accountService.getAccountByNumber(accountNumber);
  }

  
  @Get('user/:userId')
  async getAccountsByUserId(@Param('userId') userId: number): Promise<Account[]> {
    return await this.accountService.getAccountsByUserId(userId);
  }

  
  @Patch(':id/status')
  async updateAccountStatus(@Param('id') id: number, @Body() body: { status: string }): Promise<Account> {
    return await this.accountService.updateAccountStatus(id, body.status);
  }

  @GrpcMethod('AccountService', 'updateAccountBalanceGrpc') // Must match `account.proto`
  async updateAccountBalanceGrpc(@Body() body: { accountId: number; amount: number; type: string }): Promise<Account> {
    return await this.accountService.updateAccountBalanceGrpc(body.accountId, body.amount, body.type );
  }

  
  @Delete(':id')
  async deleteAccount(@Param('id') id: number): Promise<{ message: string }> {
    await this.accountService.deleteAccount(id);
    return { message: 'Account deleted successfully' };
  }
}
