import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UserSchema, User } from './users.schema';
import { OrganizationModule } from '../organization/organization.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    OrganizationModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, JwtService],
  exports: [UsersService, MongooseModule],
})
export class UsersModule {}
