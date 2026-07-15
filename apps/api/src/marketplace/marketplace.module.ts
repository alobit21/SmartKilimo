import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketplaceController } from './marketplace.controller';
import { MarketplaceService } from './marketplace.service';
import { Listing } from './entities/listing.entity';
import { CloudinaryModule } from '../common/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Listing]), CloudinaryModule],
  controllers: [MarketplaceController],
  providers: [MarketplaceService],
  exports: [MarketplaceService],
})
export class MarketplaceModule {}
