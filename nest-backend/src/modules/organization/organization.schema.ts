import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../users/users.schema';

export type OrganizationDocument = Organization & Document;

@Schema()
export class Organization {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  admins: User[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
