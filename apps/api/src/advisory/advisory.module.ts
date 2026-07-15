import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvisoryController } from './advisory.controller';
import { AdvisoryService } from './advisory.service';
import { AdvisoryRequest } from './entities/advisory-request.entity';
import { CloudinaryModule } from '../common/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdvisoryRequest]),
    CloudinaryModule
  ],
  controllers: [AdvisoryController],
  providers: [AdvisoryService],
  exports: [AdvisoryService]
})
export class AdvisoryModule {}
