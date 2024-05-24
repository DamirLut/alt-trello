import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { AuthMethodsDTO } from './dto/utils.dto';
import { UtilsService } from './utils.service';

@Controller('/utils')
export class UtilsController {
  constructor(private utilsService: UtilsService) {}

  @Get()
  @ApiResponse({ status: 200, type: AuthMethodsDTO })
  getOAuthList() {
    return this.utilsService.getOAuthList();
  }
}
