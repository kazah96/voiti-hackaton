import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { Organization } from '../organization/organization.schema';
import { Role } from './roles';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  roles: Role[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }],
  })
  organizations: Organization[];
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next: any) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
export { UserSchema };
