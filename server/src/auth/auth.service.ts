import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types/tokens.type';
import { User } from '../users/entities/user.entity';
import { UserWithoutSecrets } from '../users/types/user-without-secrets.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserByPassword(
    username: string,
    password: string,
  ): Promise<UserWithoutSecrets> {
    const user = await this.usersService.findOneByUserName(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordsMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordsMatch) {
      throw new UnauthorizedException();
    }

    return this.omitSecrets(user);
  }

  async validateUserByRefreshToken(
    id: number,
    refreshToken: string,
  ): Promise<UserWithoutSecrets> {
    const user = await this.usersService.findOneById(id);

    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException();
    }

    const refreshTokensMatch = await bcrypt.compare(
      refreshToken,
      user.refreshTokenHash,
    );

    if (!refreshTokensMatch) {
      throw new UnauthorizedException();
    }

    return this.omitSecrets(user);
  }

  async login(user: User) {
    return await this.getTokensAndUpdateRefreshTokenHash(user);
  }

  async signup(dto: AuthDto) {
    const passwordHash = await this.hashData(dto.password);
    const user = await this.usersService.create(dto.username, passwordHash);
    return await this.getTokensAndUpdateRefreshTokenHash(user);
  }

  async logout(userId: number) {
    return this.usersService.removeRefreshTokenHash(userId);
  }

  async refreshToken(userId: number, refreshToken: string) {
    const user = await this.usersService.findOneById(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    const refreshTokensMatch = await bcrypt.compare(
      refreshToken,
      user.refreshTokenHash,
    );

    if (!refreshTokensMatch) {
      throw new UnauthorizedException();
    }

    return await this.getTokensAndUpdateRefreshTokenHash(user);
  }

  private hashData(data) {
    return bcrypt.hash(data, 10);
  }

  private async getTokens(payload): Promise<Tokens> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: 'at-secret',
        expiresIn: '10m',
      }),
      this.jwtService.signAsync(payload, {
        secret: 'rt-secret',
        expiresIn: '4h',
      }),
    ]);

    return { access_token, refresh_token };
  }

  private async hashRefreshTokenAndUpdate(
    userId: number,
    refreshToken: string,
  ) {
    const refreshTokenHash = await this.hashData(refreshToken);

    return this.usersService.updateRefreshTokenHash(userId, refreshTokenHash);
  }

  private async getTokensAndUpdateRefreshTokenHash(user) {
    const payload = { username: user.username, sub: user.id };
    const tokens = await this.getTokens(payload);
    await this.hashRefreshTokenAndUpdate(user.id, tokens.refresh_token);

    return tokens;
  }

  private omitSecrets(object): UserWithoutSecrets {
    const objectCopy = { ...object };
    delete objectCopy.passwordHash;
    delete objectCopy.refreshTokenHash;

    return objectCopy;
  }
}
