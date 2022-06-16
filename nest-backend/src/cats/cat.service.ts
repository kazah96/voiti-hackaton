import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from '../interfaces/cat.interface';
import { Cat as CatSchema, CatDocument } from './cat.schema';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(CatSchema.name) private catModel: Model<CatDocument>,
  ) {}

  private readonly cats: Cat[] = [];

  async create(cat: Cat) {
    const createdCat = new this.catModel(cat);

    return createdCat.save();
  }

  async findAll() {
    return this.catModel.find().exec();
  }
}
