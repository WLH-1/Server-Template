import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;
import * as mongoose from 'mongoose';

@Schema()
export class User extends Document {

  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()
  password: string;


  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
