import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  // async validateXX(email: string, password: string) {
  //   console.log('testing....', email, password);
  //   return { userId: password, email: email };
  // }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (user === 401) {
      console.log('401....');
      throw new UnauthorizedException();
    }
    if (user === 403) {
      console.log('403....');
      throw new ForbiddenException();
    }
    return user;
  }
}