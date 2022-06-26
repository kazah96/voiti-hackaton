import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/users.schema';
import { Worker, WorkerDocument } from '../workers/workers.schema';
import { AddOrganizationDTO } from './organization.dto';
import { Organization, OrganizationDocument } from './organization.schema';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(Organization.name)
    private organizationModel: Model<OrganizationDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Worker.name)
    private workerModel: Model<WorkerDocument>,
  ) {}

  async addOrganization({ name, admins }: AddOrganizationDTO) {
    try {
      const createdOrganization = await this.organizationModel.create({
        name,
        admins,
      });

      await this.userModel
        .find({ _id: { $in: admins } })
        .updateMany({}, { $addToSet: { organizations: createdOrganization } });

      return createdOrganization.save();
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(id?: string) {
    if (id) {
      const org = await await this.organizationModel
        .findById(id)
        .populate('admins');
      const workers = await this.workerModel.find({ organization: id }).exec();

      return {
        ...org.toObject(),
        admins: org.admins.map((admin) => this.sanitizeUser(admin)),
        workers,
      };
    }
    const orgs = await this.organizationModel.find().populate('admins');

    return orgs.map((org) => ({
      // workers: this.workerModel.find({ organization: org._id }).exec(),
      ...this.sanitizeUser(org),
      admins: org.admins.map((admin) => this.sanitizeUser(admin)),
    }));
  }

  sanitizeUser = (user: any) => {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  };
}
