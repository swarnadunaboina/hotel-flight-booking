import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { SearchHotelDto } from './dto/search-hotel.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('hotels')
@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new hotel' })
  @ApiResponse({ status: 201, description: 'Hotel successfully created' })
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelsService.create(createHotelDto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search for hotels' })
  @ApiResponse({ status: 200, description: 'List of hotels found' })
  search(@Query() searchHotelDto: SearchHotelDto) {
    return this.hotelsService.search(searchHotelDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get hotel by ID' })
  @ApiResponse({ status: 200, description: 'Hotel details' })
  findOne(@Param('id') id: string) {
    return this.hotelsService.findOne(id);
  }
}
