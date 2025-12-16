import { IsString, IsNumber, IsDate, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchFlightDto {
  @IsString()
  @IsOptional()
  from?: string;

  @IsString()
  @IsOptional()
  to?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  departureDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  returnDate?: Date;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(10)
  passengers?: number;

  @IsString()
  @IsOptional()
  classType?: string;
}
