import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { PassportModule } from '@nestjs/passport';
import { Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'test',
      database: 'account',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Account]),
    PassportModule,
    JwtModule.register({
      secret: 'your_secret_key', // Use process.env.JWT_SECRET in production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AccountService, {
    provide: 'ACCOUNT_SERVICE',
    useFactory: () => ({
      transport: Transport.GRPC,
      options: {
        package: 'account',
        protoPath: 'src/proto/account.proto',
        url: 'localhost:5001',
      },
    }),
  },],
  controllers: [AccountController],
  exports: [AccountService], 
})
export class AccountModule {}
