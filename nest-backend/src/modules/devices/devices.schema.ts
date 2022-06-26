import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { Organization } from '../organization/organization.schema';

export type DeviceDocument = Device & Document;

@Schema()
export class Device {
  @Prop()
  name: string;

  @Prop()
  code: string;

  @Prop()
  deviceId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
  })
  organizationId: Organization;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
