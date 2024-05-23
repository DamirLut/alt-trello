import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import type { AuthProfile } from '#core/auth/auth.type';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(profile: AuthProfile) {
    const user = this.userRepository.create({
      createdAt: new Date(),
      updatedAt: new Date(),
      lastActiveAt: new Date(),
      username: profile.username,
      avatar: profile.avatar,
    });

    await this.entityManager.persistAndFlush(user);

    return user;
  }

  async findById(id: number) {
    return this.userRepository.findOne({ id });
  }
}
