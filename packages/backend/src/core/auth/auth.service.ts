import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import type { User } from '#core/users/entities/user.entity';
import { UserService } from '#core/users/user.service';

import { AuthEntity } from './entities/auth.entity';
import type { AuthProfile, JwtPayload } from './auth.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: EntityRepository<AuthEntity>,
    private readonly entityManager: EntityManager,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async logIn(profile: AuthProfile) {
    console.log(profile);

    let auth = await this.authRepository.findOne(
      {
        provider_id: profile.id,
        provider: profile.provider,
      },
      { populate: ['user'] },
    );

    if (!auth) {
      const user = await this.userService.create(profile);

      auth = this.authRepository.create({
        provider_id: profile.id,
        email: profile.email,
        provider: profile.provider,
        createdAt: new Date(),
        updatedAt: new Date(),
        user,
      });
    }

    auth.updatedAt = new Date();

    await this.entityManager.persistAndFlush(auth);

    return this.generateJwtToken(auth.user, profile);
  }

  private generateJwtToken(user: User, auth: AuthProfile) {
    const payload: JwtPayload = {
      id: user.id,
      provider_id: auth.id,
      provider: auth.provider,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
