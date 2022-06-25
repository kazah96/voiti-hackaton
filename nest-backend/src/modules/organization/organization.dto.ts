import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export class AddOrganizationDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  admins: mongoose.Schema.Types.ObjectId[];
}
