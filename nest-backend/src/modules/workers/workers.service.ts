import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddWorkerRqDTO } from './workers.dto';
import { Worker, WorkerDocument } from './workers.schema';

const keys: Record<string, boolean> = {};

@Injectable()
export class WorkerService {
  constructor(
    @InjectModel(Worker.name)
    private workerModel: Model<WorkerDocument>,
  ) {}

  async addWorker({ name, email, organization, phone }: AddWorkerRqDTO) {
    try {
      console.log({ name, email, organization, phone });

      const createdWorker = await this.workerModel.create({
        name,
        email,
        organization,
        phone,
      });

      return createdWorker.save();
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async getAll() {
    return await this.workerModel.find().exec();
  }

  generateKey() {
    return { key: keyGenerator() };
  }

  async generateToken(key: string) {
    if (keys[key]) {
      return 'Красавчик брат';
    }
  }
}

function getRandomInt(max: number, min: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function keyGenerator(): string {
  const generatedKey = new Array(6)
    .fill(0)
    .map(() => String.fromCharCode(getRandomInt(90, 65)))
    .join('');

  keys[generatedKey] = true;

  return generatedKey;
}

function tokenGenerator(): string {
  const generatedToken = new Array(18)
    .fill(0)
    .map(() => String.fromCharCode(getRandomInt(122, 65)))
    .join('');

  return '';
}
