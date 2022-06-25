import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddOrganizationDTO } from './organization.dto';
import { Organization, OrganizationDocument } from './organization.schema';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(Organization.name)
    private organizationModel: Model<OrganizationDocument>,
  ) {}

  async addOrganization({ name, admins }: AddOrganizationDTO) {
    try {
      const createdOrganization = await this.organizationModel.create({
        name,
        admins,
      });

      return createdOrganization.save();
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async getAll() {
    return await this.organizationModel.find().populate('admins').exec();
  }
}
