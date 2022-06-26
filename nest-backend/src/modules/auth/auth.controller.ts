import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/user.dto';
import { UsersService } from '../users/users.service';
import { UserLoginDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() user: UserLoginDTO) {
    return this.authService.login(user);
  }

  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    return this.usersService.addUser(body);
  }
}
