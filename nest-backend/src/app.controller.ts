import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { Role } from './modules/users/roles';
import { Roles } from './modules/users/roles.decorator';
import { RolesGuard } from './modules/users/roles.guard';

@ApiTags('test_user_roles')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/test_admin_role')
  @ApiBearerAuth()
  @ApiSecurity('req', ['Admin'])
  admin(@Request() req) {
    return 'раотает только с админами роут';
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Get('/test_user_role')
  user(@Request() req) {
    return 'раотает с юзерами';
  }

  @Get('/test_anonymous_role')
  anon(@Request() req) {
    return 'раотает со всеми';
  }

  @Get('/test')
  qw(@Request() req) {
    return 'раотает со вс dеми';
  }
}
