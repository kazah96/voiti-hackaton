import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkersModule } from '../workers/workers.module';
import { DeviceController } from './devices.controller';
import { Device, DeviceSchema } from './devices.schema';
import { DevicesService } from './devices.service';

@Module({
  imports: [
    WorkersModule,
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
  ],
  providers: [DevicesService],
  controllers: [DeviceController],
  exports: [DevicesService, MongooseModule],
})
export class DevicesModule {}
