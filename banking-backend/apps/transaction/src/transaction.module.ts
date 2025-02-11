import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'test',
      database: 'transaction',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Transaction]), // Register Transaction entity with TypeORM
    ClientsModule.register([
      {
        name: 'ACCOUNT_SERVICE', // Define gRPC client for Account Microservice
        transport: Transport.GRPC,
        options: {
          package: 'account', // Name of the gRPC package (must match account.proto)
          protoPath: './proto/account.proto', // Path to the proto file
          url: 'localhost:5001', // Address of the Account Microservice gRPC server
        },
      },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
