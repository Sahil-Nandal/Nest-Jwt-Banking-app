import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from './account.entity';
import { GrpcMethod } from '@nestjs/microservices';


@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  
  @Post()
  async createAccount(@Body() body: { userId: number; accountNumber: number }): Promise<Account> {
    const balance = 0;
    return await this.accountService.createAccount(body.userId, body.accountNumber, balance);
  }

  
  @Get(':id')
  async getAccountById(@Param('id') id: number): Promise<Account> {
    return await this.accountService.getAccountById(id);
  }

  @GrpcMethod('AccountService', 'GetAccountByIdGrpc') // Must match `account.proto`
  async getAccountByIdGrpc(@Body() body: { accountNumber: number}): Promise<Account> {
    return await this.accountService.getAccountByIdGrpc(body.accountNumber);
  }

  
  @Post('number')
  async getAccountByNumber(@Body() body: { accountNumber: number}): Promise<Account> {
    console.log(body.accountNumber)
    return await this.accountService.getAccountByNumber(body.accountNumber);
  }

  
  @Post('userId')
  async getAccountsByUserId(@Body() body: { userId: number}): Promise<Account[]> {
    console.log("inside controller", body.userId);
    return await this.accountService.getAccountsByUserId(body.userId);
  }

  
  @Post('status')
  async updateAccountStatus(@Body() body: { accountNumber: number; status: string}): Promise<Account> {
    return await this.accountService.updateAccountStatus(body.accountNumber, body.status);
  }

  @GrpcMethod('AccountService', 'updateAccountBalanceGrpc') // Must match `account.proto`
  async updateAccountBalanceGrpc(@Body() body: { id: number; amount: number; type: string }): Promise<Account> {
    console.log("Inside UAB controller!")
    console.log(body.id)

    return await this.accountService.updateAccountBalanceGrpc(body.id, body.amount, body.type );
  }

  
  @Post('delete')
  async deleteAccount(@Body() body: { accountNumber: number}): Promise<{ message: string }> {
    await this.accountService.deleteAccount(body.accountNumber);
    return { message: 'Account deleted successfully' };
  }
}
