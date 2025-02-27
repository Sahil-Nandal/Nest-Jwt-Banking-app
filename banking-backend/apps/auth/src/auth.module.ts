import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'test',
      database: 'auth',
      autoLoadEntities: true,
      synchronize: true, // Disable in production
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ secret: 'your_jwt_secret', signOptions: { expiresIn: '2m' } }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
