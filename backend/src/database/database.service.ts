import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class DatabaseService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Save user data to database
   * @param {Object} userData - User data to save
   * @returns {Promise} - Promise that resolves when user data is saved
   */
  async saveUserData(userData: any): Promise<User> {
    try {
      // Check if user already exists
      const existingUser = await this.userModel.findOne({ email: userData.email });

      if (existingUser) {
        // Update existing user
        const updatedUser = await this.userModel.findByIdAndUpdate(
          existingUser._id,
          {
            displayName: userData.displayName,
            photoURL: userData.photoURL,
            provider: userData.provider,
            lastLoginAt: new Date()
          },
          { new: true }
        );
        return updatedUser;
      } else {
        // Create new user
        const newUser = new this.userModel({
          firstName: userData.displayName.split(' ')[0],
          lastName: userData.displayName.split(' ')[1] || '',
          email: userData.email,
          password: Math.random().toString(36).slice(-8), // Random password for social auth
          avatar: userData.photoURL,
          provider: userData.provider,
          googleId: userData.provider === 'google.com' ? userData.uid : undefined,
          facebookId: userData.provider === 'facebook.com' ? userData.uid : undefined,
          createdAt: new Date(),
          lastLoginAt: new Date()
        });
        return newUser.save();
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  }

  /**
   * Get user data from database
   * @param {string} uid - Firebase user ID
   * @returns {Promise} - Promise that resolves with user data
   */
  async getUserData(uid: string): Promise<User | null> {
    try {
      // Try to find by googleId or facebookId first
      let user = await this.userModel.findOne({ 
        $or: [
          { googleId: uid },
          { facebookId: uid }
        ]
      });

      // If not found, try to find by email (for regular auth users)
      if (!user) {
        user = await this.userModel.findById(uid);
      }

      return user;
    } catch (error) {
      console.error('Error getting user data:', error);
      throw error;
    }
  }

  /**
   * Update user data in database
   * @param {string} uid - Firebase user ID
   * @param {Object} userData - Updated user data
   * @returns {Promise} - Promise that resolves when user data is updated
   */
  async updateUserData(uid: string, userData: any): Promise<User | null> {
    try {
      // Try to find by googleId or facebookId first
      let user = await this.userModel.findOne({ 
        $or: [
          { googleId: uid },
          { facebookId: uid }
        ]
      });

      // If not found, try to find by ID (for regular auth users)
      if (!user) {
        user = await this.userModel.findById(uid);
      }

      if (!user) {
        throw new Error('User not found');
      }

      // Update user data
      const updatedUser = await this.userModel.findByIdAndUpdate(
        user._id,
        userData,
        { new: true }
      );

      return updatedUser;
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  }
}
