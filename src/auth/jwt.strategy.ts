import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
      passReqToCallback: true
    });
  }

  async validate(request: Request, payload: any) {
    console.log('JwtStrategy validate ******************************');
    const Headers = JSON.parse(JSON.stringify(request.headers));
    const Token = Headers.authorization.replace('Bearer ', '')
    const valid = await this.authService.validateSession(Token);
    if (!valid) {
      console.log('403....');
      throw new ForbiddenException();
    }
    return { userId: payload.sub, email: payload.email };
  }
}