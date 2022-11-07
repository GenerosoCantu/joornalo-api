import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import config from '../config/keys'
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.secret,
    });
  }

  async validate(payload: any) {
    console.log('JwtStrategy validate ******************************');
    console.log(payload);
    const valid = await this.authService.validateSession('okokok');
    //console.log(ExtractJwt.fromAuthHeaderAsBearerToken);
    return { userId: payload.sub, email: payload.email };
  }
}