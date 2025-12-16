import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HotelDocument = Hotel & Document;

@Schema()
export class Hotel {
  @Prop()
  name: string;

  @Prop()
  location: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  rating: number;

  @Prop()
  image: string;

  @Prop([String])
  amenities: string[];

  @Prop()
  maxGuests: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
