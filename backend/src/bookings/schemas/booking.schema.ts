import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema()
export class Booking {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  type: 'hotel' | 'flight';

  @Prop({ required: true })
  itemId: string; // ID of the hotel or flight

  @Prop({ required: true })
  status: 'confirmed' | 'pending' | 'cancelled';

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  checkInDate?: Date;

  @Prop()
  checkOutDate?: Date;

  @Prop()
  departureDate?: Date;

  @Prop()
  returnDate?: Date;

  @Prop()
  guests?: number;

  @Prop()
  classType?: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
