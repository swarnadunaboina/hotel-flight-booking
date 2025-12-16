import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FlightDocument = Flight & Document;

@Schema()
export class Flight {
  @Prop()
  airline: string;

  @Prop()
  flightNumber: string;

  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  departureTime: string;

  @Prop()
  arrivalTime: string;

  @Prop()
  departureDate: Date;

  @Prop()
  returnDate: Date;

  @Prop()
  duration: string;

  @Prop()
  price: number;

  @Prop()
  stops: number;

  @Prop()
  baggage: string;

  @Prop()
  classType: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
