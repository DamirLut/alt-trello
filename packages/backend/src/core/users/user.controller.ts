import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { JwtUser } from '#core/auth/auth.decorator';
import { JwtAuthGuard } from '#core/auth/auth.guard';
import type { JwtPayload } from '#core/auth/auth.type';

import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, type: User })
  async getSelf(@JwtUser() payload: JwtPayload) {
    const user = await this.userService.findById(payload.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
