
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: string;
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['user', 'admin'], default: 'user' })
  role: string;

  @Prop()
  avatar?: string;

  @Prop()
  phone?: string;

  @Prop({ type: Types.ObjectId, ref: 'Booking' })
  bookings?: Types.ObjectId[];

  @Prop()
  googleId?: string;

  @Prop()
  facebookId?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  provider?: string;

  @Prop()
  lastLoginAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
