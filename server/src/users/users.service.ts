import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async onModuleInit(): Promise<void> {
    return this.seedDatabaseWithUsers();
  }

  async findOneByUserName(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  async findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async create(username: string, passwordHash: string): Promise<User> {
    const user = this.userRepository.create({ username, passwordHash });

    await this.userRepository.insert(user);

    return user;
  }

  async updateRefreshTokenHash(id, refreshTokenHash) {
    return this.userRepository.update({ id }, { refreshTokenHash });
  }

  async removeRefreshTokenHash(id) {
    return this.updateRefreshTokenHash(id, null);
  }

  async seedDatabaseWithUsers() {
    if ((await this.userRepository.count()) === 0) {
      for (const username of ['admin', 'public']) {
        const passwordHash = await bcrypt.hash(username, 10);
        await this.userRepository.save({
          username,
          passwordHash,
          role: username,
        });
      }
    }
  }
}
