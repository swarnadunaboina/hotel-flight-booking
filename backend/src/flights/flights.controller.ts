import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { SearchFlightDto } from './dto/search-flight.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('flights')
@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new flight' })
  @ApiResponse({ status: 201, description: 'Flight successfully created' })
  create(@Body() createFlightDto: CreateFlightDto) {
    return this.flightsService.create(createFlightDto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search for flights' })
  @ApiResponse({ status: 200, description: 'List of flights found' })
  search(@Query() searchFlightDto: SearchFlightDto) {
    return this.flightsService.search(searchFlightDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get flight by ID' })
  @ApiResponse({ status: 200, description: 'Flight details' })
  findOne(@Param('id') id: string) {
    return this.flightsService.findOne(id);
  }
}
