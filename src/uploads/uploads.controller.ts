import { Controller, Get, Post, Headers, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @UseInterceptors(FileInterceptor("imagelogo"))
  createURL(@UploadedFile() file: Express.Multer.File, @Headers() headers: any) {
    return this.uploadsService.uploadLogoImage(file, headers);
  }
}
