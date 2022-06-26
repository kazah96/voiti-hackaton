import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import * as dotenv from 'dotenv';
import { RolesGuard } from '../users/roles.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { OrganizationModule } from '../organization/organization.module';
dotenv.config();

@Module({
  imports: [
    forwardRef(() => UsersModule),
    OrganizationModule,
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '7d' },
      secret: `${process.env.TOKEN_SECRET}`,
    }),
    AuthModule,
  ],
  providers: [
    AuthService,
    RolesGuard,
    JwtAuthGuard,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
