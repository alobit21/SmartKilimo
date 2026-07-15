import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import 'multer';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    const cloud_name = this.configService.get<string>('CLOUDINARY_CLOUD_NAME');
    const api_key = this.configService.get<string>('CLOUDINARY_API_KEY');
    const api_secret = this.configService.get<string>('CLOUDINARY_API_SECRET');

    console.log('[Cloudinary] Configuring with:', { cloud_name, api_key, api_secret: api_secret?.slice(0,8) + '...' });

    cloudinary.config({ cloud_name, api_key, api_secret, secure: true });

    cloudinary.api.ping()
      .then(() => console.log('[Cloudinary] ✅ Credentials verified OK'))
      .catch(e => console.error('[Cloudinary] ❌ Credential check failed:', e.http_code, e.message));
  }

  async uploadImage(file: any): Promise<UploadApiResponse> {
    const mimeType = file.mimetype || 'image/jpeg';
    const b64 = Buffer.from(file.buffer).toString('base64');
    const dataURI = `data:${mimeType};base64,${b64}`;

    console.log('[Cloudinary] Uploading image (unsigned), size:', file.buffer?.length, 'bytes');

    try {
      const result = await cloudinary.uploader.unsigned_upload(dataURI, 'kilimosmart_preset', {
        resource_type: 'image',
        folder: 'kilimosmart',
      });
      console.log('[Cloudinary] ✅ Upload success:', result.secure_url);
      return result;
    } catch (error) {
      console.error('[Cloudinary] ❌ Upload failed:', JSON.stringify(error));
      throw error;
    }
  }
}
