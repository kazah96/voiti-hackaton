import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import {
  Organization,
  OrganizationDocument,
} from '../organization/organization.schema';
import { Role } from './roles';
import { User as UserSchema, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserSchema.name) private userModel: Model<UserDocument>,

    @InjectModel(Organization.name)
    private organizationModel: Model<OrganizationDocument>,
    private jwtService: JwtService,
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

  async findOneByJWT(res: Request) {
    const token = res.headers.authorization;
    if (token) {
      const newToken = token.substring(7, token.length);
      const decoded = this.jwtService.decode(newToken) as { email: string };

      const me = this.sanitizeUser(
        await this.userModel.findOne({ email: decoded.email }).exec(),
      );

      return me;
    } else {
      throw new HttpException(
        { error: 'not autorized' },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async findAll(organizationID?: string) {
    if (organizationID) {
      const org = await this.organizationModel
        .findById(organizationID)
        .populate('admins');

      return {
        users: org.admins.map((admin) => {
          const sanitized = (admin as any).toObject();
          delete sanitized.password;
          return sanitized;
        }),
      };
    }

    const users = await this.userModel.find().exec();

    return users.map((user) => this.sanitizeUser(user));
  }
}
