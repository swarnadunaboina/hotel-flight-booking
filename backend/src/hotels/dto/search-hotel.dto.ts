import { IsString, IsNumber, IsDate, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchHotelDto {
  @IsString()
  @IsOptional()
  destination?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  checkInDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  checkOutDate?: Date;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(10)
  guests?: number;
}
