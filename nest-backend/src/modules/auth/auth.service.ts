import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserLoginDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new HttpException("user doesn't exists", HttpStatus.BAD_REQUEST);
    }

    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

  async login({ email }: UserLoginDTO) {
    const userResult = await this.usersService.findOne(email);

    const payload = {
      email: userResult.email,
      sub: userResult._id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: this.sanitizeUser(userResult),
    };
  }

  sanitizeUser(user: any) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }
}
