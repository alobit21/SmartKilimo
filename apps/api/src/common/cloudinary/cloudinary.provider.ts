import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const cloud_name = configService.get('CLOUDINARY_CLOUD_NAME');
    const api_key = configService.get('CLOUDINARY_API_KEY');
    const api_secret = configService.get('CLOUDINARY_API_SECRET');
    console.log('DEBUG CLOUDINARY CONFIG:', { cloud_name, api_key: api_key ? 'EXISTS' : 'MISSING', api_secret: api_secret ? 'EXISTS' : 'MISSING' });
    return cloudinary.config({
      cloud_name,
      api_key,
      api_secret,
    });
  },
};
