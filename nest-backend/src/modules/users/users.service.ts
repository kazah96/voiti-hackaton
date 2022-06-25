import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './roles';
import { User as UserSchema, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserSchema.name) private userModel: Model<UserDocument>,
  ) {}

  async addUser({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }) {
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = await this.userModel.create({
      email,
      name,
      password,
      roles: [Role.Admin, Role.User],
      isAdmin: false,
    });
    return this.sanitizeUser(await createdUser.save());
  }

  sanitizeUser = (user: any) => {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  };

  async findOne(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }
}
