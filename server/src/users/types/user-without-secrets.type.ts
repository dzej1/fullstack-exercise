import { User } from '../entities/user.entity';

export type UserWithoutSecrets = Omit<
  User,
  'refreshTokenHash' | 'passwordHash'
>;
