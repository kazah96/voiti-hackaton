import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(@Query('organizationID') organizationID?: string) {
    return this.usersService.findAll(organizationID);
  }

  @Get('/me')
  async getMe(@Req() res: Request) {
    return this.usersService.findOneByJWT(res);
  }
}
