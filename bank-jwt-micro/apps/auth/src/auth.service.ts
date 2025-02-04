import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) 
    private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(data: { email: string; password: string }){
    const user = this.userRepo.create(data);
    return await this.userRepo.save(user);
  }

  async login(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user || !(password === user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
