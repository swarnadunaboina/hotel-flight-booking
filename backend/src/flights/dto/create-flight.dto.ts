import { IsString, IsNumber, IsDate, IsOptional, Min, Max } from 'class-validator';

export class CreateFlightDto {
  @IsString()
  airline: string;

  @IsString()
  flightNumber: string;

  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsString()
  departureTime: string;

  @IsString()
  arrivalTime: string;

  @IsDate()
  departureDate: Date;

  @IsOptional()
  @IsDate()
  returnDate?: Date;

  @IsString()
  duration: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  stops: number;

  @IsString()
  baggage: string;

  @IsString()
  classType: string;
}
