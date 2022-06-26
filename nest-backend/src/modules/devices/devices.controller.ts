import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ActivateDeviceDto, CreateDeviceDto } from './devices.dto';
import { DevicesService } from './devices.service';

@ApiTags('devices')
@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DevicesService) {}

  @Get()
  async geAllDevices() {
    return this.deviceService.getAll();
  }

  @Post('/create')
  async createDevice(@Body() query: CreateDeviceDto) {
    return this.deviceService.createDevice(query);
  }

  @Post('/:code/activate')
  async activateDevice(
    @Body() body: ActivateDeviceDto,
    @Param('code') code: string,
  ) {
    return this.deviceService.activateDevice(code, body);
  }

  @Get('/:code/update_base')
  async update(@Param('code') code: string) {
    return this.deviceService.updateBase(code);
  }

  // @Get('/me')
  // async getMe(@Req() res: Request) {
  //   return this.usersService.findOneByJWT(res);
  // }
}
