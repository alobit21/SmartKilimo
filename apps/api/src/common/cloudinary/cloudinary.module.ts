import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

// Removed CloudinaryProvider — CloudinaryService now handles config directly via ConfigService
@Module({
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
