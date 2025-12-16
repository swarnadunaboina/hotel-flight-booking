import { IsString, IsNumber, IsDate, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookingDto {
  @IsEnum(['hotel', 'flight'])
  type: 'hotel' | 'flight';

  @IsString()
  itemId: string; // ID of the hotel or flight

  @IsNumber()
  totalPrice: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  checkInDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  checkOutDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  departureDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  returnDate?: Date;

  @IsOptional()
  @IsNumber()
  guests?: number;

  @IsOptional()
  @IsString()
  classType?: string;
}
