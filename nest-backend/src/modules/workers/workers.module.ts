import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from '../mail/mail.module';
import { WorkersController } from './workers.controller';
import { Worker, WorkerSchema } from './workers.schema';
import { WorkerService } from './workers.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Worker.name, schema: WorkerSchema }]),
    MailModule,
  ],
  controllers: [WorkersController],
  providers: [WorkerService],
  exports: [WorkerService, MongooseModule],
})
export class WorkersModule {}
