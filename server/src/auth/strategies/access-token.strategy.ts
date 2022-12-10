import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtValidateStrategyPayloadType } from '../types/jwt-validate-strategy-payload.type';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-at') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'at-secret',
    });
  }

  async validate(payload: JwtValidateStrategyPayloadType) {
    // it returns a user object, which can be accessed on req object
    return { id: payload.sub, username: payload.username, role: payload.role };
  }
}
