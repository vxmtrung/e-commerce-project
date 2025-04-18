import { Controller, Inject, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ICloudinaryService } from '../services/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublicRoute } from '../../../decorators/public-route.decorator';

@PublicRoute()
@Controller('cloudinary')
export class CloudinaryController {
  constructor(
    @Inject('ICloudinaryService')
    private readonly cloudinaryService: ICloudinaryService
  ) {}

  @Post('files')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFiles(@UploadedFile() file: Express.Multer.File) {
    return await this.cloudinaryService.uploadFile(file);
  }
}
