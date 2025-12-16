import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel } from './schemas/hotel.schema';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { SearchHotelDto } from './dto/search-hotel.dto';

@Injectable()
export class HotelsService {
  constructor(@InjectModel(Hotel.name) private hotelModel: Model<Hotel>) {}

  async create(createHotelDto: CreateHotelDto): Promise<Hotel> {
    const newHotel = new this.hotelModel(createHotelDto);
    return newHotel.save();
  }

  async search(searchHotelDto: SearchHotelDto): Promise<Hotel[]> {
    const { destination, checkInDate, checkOutDate, guests } = searchHotelDto;

    const query: any = {};

    if (destination) {
      query.$or = [
        { name: { $regex: destination, $options: 'i' } },
        { location: { $regex: destination, $options: 'i' } }
      ];
    }

    if (guests) query.maxGuests = { $gte: guests };

    return this.hotelModel.find(query).exec();
  }

  async findOne(id: string): Promise<Hotel> {
    return this.hotelModel.findById(id).exec();
  }
}
