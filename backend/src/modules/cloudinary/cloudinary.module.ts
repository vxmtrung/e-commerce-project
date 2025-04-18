import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import { CloudinaryService } from './services/cloudinary.service';
import { CloudinaryController } from './controllers/cloudinary.controller';

@Module({
  controllers: [CloudinaryController],
  providers: [
    CloudinaryProvider,
    {
      provide: 'ICloudinaryService',
      useClass: CloudinaryService
    }
  ],
  exports: [CloudinaryProvider, 'ICloudinaryService']
})
export class CloudinaryModule {}
