import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(@InjectModel(Booking.name) private bookingModel: Model<Booking>) {}

  async create(createBookingDto: CreateBookingDto, userId: string): Promise<Booking> {
    const newBooking = new this.bookingModel({
      ...createBookingDto,
      userId,
      status: 'confirmed',
      createdAt: new Date(),
    });
    return newBooking.save();
  }

  async findAllByUser(userId: string): Promise<Booking[]> {
    return this.bookingModel.find({ userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<Booking> {
    const booking = await this.bookingModel.findById(id).exec();

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.userId !== userId) {
      throw new ForbiddenException('You do not have permission to view this booking');
    }

    return booking;
  }
}
