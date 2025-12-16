import { IsString, IsNumber, IsArray, IsOptional, Min, Max } from 'class-validator';

export class CreateHotelDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsString()
  image: string;

  @IsArray()
  @IsString({ each: true })
  amenities: string[];

  @IsNumber()
  @Min(1)
  @Max(10)
  maxGuests: number;
}
