import { Controller, Post, Body } from '@nestjs/common'; // Add @Body decorator for request body
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('signup')
  async createUser(@Body() data: { email: string; password: string }) { 
    return await this.authService.createUser(data);
  }

  @Post('login')
  async login(@Body() data: { email: string; password: string }) { 
    return this.authService.login(data.email, data.password);
  }
}
