import { Injectable } from '@nestjs/common';
import { CloudinaryResponse } from '../domains/dtos/cloudinary-response.dto';
import { v2 as cloudinary } from 'cloudinary';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const streamifier = require('streamifier');

export interface ICloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse>;
}

@Injectable()
export class CloudinaryService implements ICloudinaryService {
  async uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
