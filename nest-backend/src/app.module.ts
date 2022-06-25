import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersService } from './modules/users/users.service';
import { UsersModule } from './modules/users/users.module';
import { AuthController } from './modules/auth/auth.controller';
import { LogsModule } from './modules/logs/logs.module';
import { LogsController } from './modules/logs/logs.controller';
import { OrganizationModule } from './modules/organization/organization.module';
import { OrganizationService } from './modules/organization/organization.service';
import { OrganizationController } from './modules/organization/organization.controller';
import { UsersController } from './modules/users/users.controller';
import { WorkersController } from './modules/workers/workers.controller';
import { WorkersModule } from './modules/workers/workers.module';

const mongoDbConnectionString = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;

@Module({
  imports: [
    MongooseModule.forRoot(mongoDbConnectionString),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../../.env' }),
    AuthModule,
    UsersModule,
    LogsModule,
    OrganizationModule,
    WorkersModule,
  ],
  controllers: [
    AppController,
    AuthController,
    LogsController,
    OrganizationController,
    UsersController,
    WorkersController,
  ],
  providers: [AppService, UsersService, OrganizationService],
})
export class AppModule {}
