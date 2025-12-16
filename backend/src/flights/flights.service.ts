import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flight } from './schemas/flight.schema';
import { CreateFlightDto } from './dto/create-flight.dto';
import { SearchFlightDto } from './dto/search-flight.dto';

@Injectable()
export class FlightsService {
  constructor(@InjectModel(Flight.name) private flightModel: Model<Flight>) {}

  async create(createFlightDto: CreateFlightDto): Promise<Flight> {
    const newFlight = new this.flightModel(createFlightDto);
    return newFlight.save();
  }

  async search(searchFlightDto: SearchFlightDto): Promise<Flight[]> {
    const { from, to, departureDate, returnDate, passengers, classType } = searchFlightDto;

    const query: any = {};

    if (from) query.from = from;
    if (to) query.to = to;
    if (departureDate) {
      const departureDateObj = new Date(departureDate);
      query.departureDate = {
        $gte: departureDateObj,
        $lt: new Date(departureDateObj.getTime() + 24 * 60 * 60 * 1000)
      };
    }

    if (classType) query.classType = classType;

    return this.flightModel.find(query).exec();
  }

  async findOne(id: string): Promise<Flight> {
    return this.flightModel.findById(id).exec();
  }
}
