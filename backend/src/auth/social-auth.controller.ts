import { Controller, Post, Get, Put, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { SocialAuthDto } from '../users/dto/social-auth.dto';

@ApiTags('social-auth')
@Controller('auth/social')
export class SocialAuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('google')
  @ApiOperation({ summary: 'Sign in with Google' })
  @ApiResponse({ status: 201, description: 'User successfully authenticated with Google' })
  async googleAuth(@Body() userData: SocialAuthDto) {
    try {
      // Check if user already exists
      const existingUser = await this.usersService.findByEmail(userData.email);

      if (existingUser) {
        // User exists, update their info and return
        const updatedUser = await this.usersService.update(existingUser._id, {
          photoURL: userData.photoURL,
          lastLoginAt: new Date(),
          provider: 'google'
        });
        return { success: true, user: updatedUser };
      } else {
        // New user, create account
        const newUser = await this.usersService.create({
          ...userData,
          provider: 'google',
          createdAt: new Date(),
          lastLoginAt: new Date()
        });
        return { success: true, user: newUser };
      }
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Google authentication failed', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('facebook')
  @ApiOperation({ summary: 'Sign in with Facebook' })
  @ApiResponse({ status: 201, description: 'User successfully authenticated with Facebook' })
  async facebookAuth(@Body() userData: SocialAuthDto) {
    try {
      // Check if user already exists
      const existingUser = await this.usersService.findByEmail(userData.email);

      if (existingUser) {
        // User exists, update their info and return
        const updatedUser = await this.usersService.update(existingUser._id, {
          photoURL: userData.photoURL,
          lastLoginAt: new Date(),
          provider: 'facebook'
        });
        return { success: true, user: updatedUser };
      } else {
        // New user, create account
        const newUser = await this.usersService.create({
          ...userData,
          provider: 'facebook',
          createdAt: new Date(),
          lastLoginAt: new Date()
        });
        return { success: true, user: newUser };
      }
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Facebook authentication failed', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
