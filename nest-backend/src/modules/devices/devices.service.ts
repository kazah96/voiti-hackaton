import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Worker, WorkerDocument } from '../workers/workers.schema';
import { keyGenerator } from '../workers/workers.service';
import { ActivateDeviceDto, CreateDeviceDto } from './devices.dto';

import { Device, DeviceDocument } from './devices.schema';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
    @InjectModel(Worker.name) private workerModel: Model<WorkerDocument>,
  ) {}

  async getAll() {
    return this.deviceModel.find().exec();
  }

  async createDevice({ name, organizationId }: CreateDeviceDto) {
    const generatedCode = keyGenerator(10);
    const createdDevice = await this.deviceModel.create({
      name,
      code: generatedCode,
      organizationId,
    });
    return createdDevice.save();
  }

  async activateDevice(code: string, body: ActivateDeviceDto) {
    const device = await this.deviceModel.findOne({ code });
    if (!device) {
      throw new HttpException(
        { error: 'not authorized' },
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.deviceModel.findOneAndUpdate(
      { code },
      { $set: { deviceId: body.deviceId } },
    );
  }

  async updateBase(code: string) {
    const device = await this.deviceModel.findOne({ code });

    if (device) {
      const workers = await this.workerModel.find().exec();

      const keyDeviceIdPair = {};
      workers.forEach((w) => {
        keyDeviceIdPair[w.deviceId] = { pass: w.keyPass, name: w.name };
      });
      return { name: device.name, keyDeviceIdPair };
    }

    throw new HttpException(
      { error: 'device was not found by code' },
      HttpStatus.NOT_FOUND,
    );
  }
}
