import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { JwtValidateStrategyPayloadType } from '../types/jwt-validate-strategy-payload.type';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-rt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'rt-secret',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtValidateStrategyPayloadType) {
    const refresh_token = req.get('authorization').replace('Bearer', '').trim();

    const user = await this.authService.validateUserByRefreshToken(
      payload.sub,
      refresh_token,
    );

    return { refresh_token, ...user };
  }
}
