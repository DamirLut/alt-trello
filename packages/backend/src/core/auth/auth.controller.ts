import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';

import type { EnvironmentVariables } from '#config/env.config';

import { AuthService } from './auth.service';
import type { AuthProfile } from './auth.type';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService<EnvironmentVariables>,
  ) {}

  @Get('/vk')
  @UseGuards(AuthGuard('vk'))
  async authVk(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.logIn(req, res);
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  authGoogle(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.logIn(req, res);
  }

  @Get('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('auth', null, { httpOnly: true });
  }

  private async logIn(req: Request, res: Response) {
    const { access_token } = await this.authService.logIn(
      req.user as AuthProfile,
    );

    const url = this.configService.get('HOST');

    res.cookie('auth', access_token, { httpOnly: true });
    res.redirect(url);
  }
}
