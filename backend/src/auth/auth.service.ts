
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const userObj = user as any;
      const { password, ...result } = userObj;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const userObj = user as any;
    const payload = { email: user.email, sub: userObj._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: (user as any)._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);
    return this.login(user);
  }

  async validateGoogleUser(googleUser: any): Promise<any> {
    const { id, emails, firstName, lastName, photos } = googleUser;
    let user = await this.usersService.findByGoogleId(id);

    if (!user) {
      const email = emails[0].value;
      user = await this.usersService.findByEmail(email);

      if (!user) {
        // Create a new user
        const newUser = {
          firstName,
          lastName,
          email,
          googleId: id,
          avatar: photos[0].value,
          password: Math.random().toString(36).slice(-8), // Random password for OAuth users
        };
        user = await this.usersService.create(newUser);
      } else {
        // Link Google account to existing user
        user = await this.usersService.update((user as any)._id, { googleId: id });
      }
    }

    return this.login(user);
  }

  async validateFacebookUser(facebookUser: any): Promise<any> {
    const { id, emails, firstName, lastName, photos } = facebookUser;
    let user = await this.usersService.findByFacebookId(id);

    if (!user) {
      const email = emails[0].value;
      user = await this.usersService.findByEmail(email);

      if (!user) {
        // Create a new user
        const newUser = {
          firstName,
          lastName,
          email,
          facebookId: id,
          avatar: photos[0].value,
          password: Math.random().toString(36).slice(-8), // Random password for OAuth users
        };
        user = await this.usersService.create(newUser);
      } else {
        // Link Facebook account to existing user
        user = await this.usersService.update((user as any)._id, { facebookId: id });
      }
    }

    return this.login(user);
  }
}
