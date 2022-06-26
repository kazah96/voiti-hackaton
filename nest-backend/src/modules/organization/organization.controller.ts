import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddOrganizationDTO } from './organization.dto';
import { OrganizationService } from './organization.service';

@ApiTags('organization')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post('/add')
  async addOrganization(@Body() body: AddOrganizationDTO) {
    return this.organizationService.addOrganization(body);
  }

  @Get()
  async get(@Query('id') id?: string) {
    return this.organizationService.getAll(id);
  }
}
