import { Controller, Post, Get, Put, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DatabaseService } from './database.service';

@ApiTags('database')
@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post('users')
  @ApiOperation({ summary: 'Save user data to database' })
  @ApiResponse({ status: 201, description: 'User data successfully saved' })
  async saveUserData(@Body() userData: any) {
    try {
      const result = await this.databaseService.saveUserData(userData);
      return { success: true, data: result };
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Failed to save user data', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('users/:uid')
  @ApiOperation({ summary: 'Get user data from database' })
  @ApiResponse({ status: 200, description: 'User data retrieved successfully' })
  async getUserData(@Param('uid') uid: string) {
    try {
      const result = await this.databaseService.getUserData(uid);
      return { success: true, data: result };
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Failed to get user data', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put('users/:uid')
  @ApiOperation({ summary: 'Update user data in database' })
  @ApiResponse({ status: 200, description: 'User data updated successfully' })
  async updateUserData(@Param('uid') uid: string, @Body() userData: any) {
    try {
      const result = await this.databaseService.updateUserData(uid, userData);
      return { success: true, data: result };
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Failed to update user data', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
