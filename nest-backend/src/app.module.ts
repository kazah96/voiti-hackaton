import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { ConfigModule } from '@nestjs/config';

const mongoDbConnectionString = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;

@Module({
  imports: [
    CatsModule,
    MongooseModule.forRoot(mongoDbConnectionString),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../../.env' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
