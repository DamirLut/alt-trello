import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';

import type { AuthProfile } from '#core/auth/auth.type';

import type { UpdateProfileDTO } from './dto/update-profile.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(profile: AuthProfile) {
    const user = this.userRepository.create({
      createdAt: new Date(),
      updatedAt: new Date(),
      lastActiveAt: new Date(),
      username: profile.username,
      avatar: profile.avatar,
      email: profile.email,
    });

    await this.entityManager.persistAndFlush(user);

    return user;
  }

  async findById(id: number) {
    return this.userRepository.findOne({ id });
  }

  async searchByUsername(username: string) {
    const like = `%${username}%`;

    return this.userRepository.find(
      {
        $or: [{ username: { $ilike: like } }, { email: { $ilike: like } }],
      },
      { limit: 10 },
    );
  }

  async updateProfile(id: number, dto: UpdateProfileDTO) {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.username = dto.username;
    user.email = dto.email;

    await this.entityManager.persistAndFlush(user);

    return user;
  }

  async deleteProfile(id: number) {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.entityManager.removeAndFlush(user);

    return user;
  }
}
