import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Organization } from '../organization/organization.schema';

export type WorkerDocument = Worker & Document;

@Schema()
export class Worker {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: false })
  androidId: string;

  @Prop({ required: false })
  keyPass: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' })
  organization: Organization;
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);
