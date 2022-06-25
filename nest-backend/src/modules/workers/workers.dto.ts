import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export class AddWorkerRqDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  organization: mongoose.Schema.Types.ObjectId;
}

export class GenerateToken {
  @ApiProperty()
  key: string;
}
