import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  organizationId: string;
}

export class ActivateDeviceDto {
  @ApiProperty()
  deviceId: string;
}
