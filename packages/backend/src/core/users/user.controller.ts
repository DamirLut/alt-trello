import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtUser } from '#core/auth/auth.decorator';
import { JwtAuthGuard } from '#core/auth/auth.guard';
import type { JwtPayload } from '#core/auth/auth.type';

import { UpdateProfileDTO } from './dto/update-profile.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, type: UserEntity })
  async getSelf(@JwtUser() payload: JwtPayload) {
    const user = await this.userService.findById(payload.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Get('/search')
  @ApiResponse({ status: 200, type: [UserEntity] })
  searchUser(@Query('username') username: string) {
    return this.userService.searchByUsername(username);
  }

  @Patch()
  @ApiResponse({ status: 200, type: UserEntity })
  updateProfile(@JwtUser() payload: JwtPayload, @Body() dto: UpdateProfileDTO) {
    return this.userService.updateProfile(payload.id, dto);
  }

  @Delete()
  @ApiResponse({ status: 200, type: UserEntity })
  deleteProfile(@JwtUser() payload: JwtPayload) {
    return this.userService.deleteProfile(payload.id);
  }
}
