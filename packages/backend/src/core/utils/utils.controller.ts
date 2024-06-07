import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { customAlphabet } from 'nanoid';
import { extname } from 'path';

import { FileSize, UPLOAD_PATH } from '#config/constant';

import { AuthMethodsDTO } from './dto/utils.dto';
import { UtilsService } from './utils.service';

const nanoid = customAlphabet(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  32,
);

const storage = diskStorage({
  destination: UPLOAD_PATH,
  filename(_req, file, callback) {
    const id = nanoid();
    file.originalname = Buffer.from(file.originalname, 'latin1').toString(
      'utf8',
    );
    callback(null, `${id}${extname(file.originalname)}`);
  },
});

@Controller('/utils')
export class UtilsController {
  constructor(private utilsService: UtilsService) {}

  @Get()
  @ApiResponse({ status: 200, type: AuthMethodsDTO })
  getOAuthList() {
    return this.utilsService.getOAuthList();
  }

  @Get('/fetchUrl')
  fetchUrl(@Query('url') url: string) {
    return this.utilsService.fetchUrl(url);
  }

  @Post('/uploadImage')
  @UseInterceptors(
    FileInterceptor('image', {
      storage,
    }),
  )
  uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: FileSize.Mb * 10 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return {
      success: 1,
      file: {
        url: file.path.replace(UPLOAD_PATH, process.env.HOST + '/api/assets'),
      },
    };
  }

  @Post('/uploadFile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: FileSize.Mb * 50 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return {
      success: 1,
      file: {
        title: file.originalname,
        size: file.size,
        extension: extname(file.originalname).slice(1),
        url: file.path.replace(UPLOAD_PATH, process.env.HOST + '/api/assets'),
      },
    };
  }
}
