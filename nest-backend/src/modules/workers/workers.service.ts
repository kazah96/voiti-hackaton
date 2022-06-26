import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { MailService } from '../mail/mail.service';
import { AddWorkerRqDTO, GenerateKey, GenerateToken } from './workers.dto';
import { Worker, WorkerDocument } from './workers.schema';

const keys: Record<string, string> = {};

@Injectable()
export class WorkerService {
  constructor(
    @InjectModel(Worker.name)
    private workerModel: Model<WorkerDocument>,
    private mailService: MailService,
  ) {}

  async addWorker({ name, email, organization, phone }: AddWorkerRqDTO) {
    try {
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

  async removeWorker(id?: string) {
    if (!id || !isValidObjectId(id)) {
      throw new HttpException(
        { error: 'Отправь айди нормально' },
        HttpStatus.NOT_FOUND,
      );
    }
    const worker = await this.workerModel.findByIdAndDelete(id);

    if (!worker) {
      throw new HttpException(
        { error: 'Такого работника нет' },
        HttpStatus.NOT_FOUND,
      );
    }

    return worker;
  }

  async getAll() {
    return await this.workerModel.find().exec();
  }

  async generateKey({ workerEmail }: GenerateKey) {
    if (!workerEmail) {
      throw new HttpException(
        { error: 'Требуется email' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const worker = await this.workerModel
      .findOne({ email: workerEmail })
      .exec();

    if (!worker) {
      throw new HttpException(
        { error: 'Работника с таким email не существует' },
        HttpStatus.NOT_FOUND,
      );
    }
    const key = keyGenerator(6);
    keys[key] = workerEmail;

    // this.mailService.sendUserKey(workerEmail, key);

    return { key };
  }

  async generateToken({ deviceId, key }: GenerateToken) {
    if (keys[key]) {
      const token = tokenGenerator(18);
      await this.workerModel.findOneAndUpdate(
        { email: keys[key] },
        { $set: { keyPass: token, deviceId } },
      );
      delete keys[key];

      return { token };
    }
    throw new HttpException(
      { error: 'Ключ не существует' },
      HttpStatus.NOT_FOUND,
    );
  }
}

export function getRandomInt(max: number, min: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function keyGenerator(length): string {
  const generatedKey = new Array(length)
    .fill(0)
    .map(() => String.fromCharCode(getRandomInt(90, 65)))
    .join('');

  return generatedKey;
}

export function tokenGenerator(length): string {
  const generatedToken = new Array(length)
    .fill(0)
    .map(() => String.fromCharCode(getRandomInt(122, 65)))
    .join('');

  return generatedToken;
}
