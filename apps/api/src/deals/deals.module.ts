import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealsController } from './deals.controller';
import { DealsService } from './deals.service';
import { Deal } from './entities/deal.entity';
import { Listing } from '../marketplace/entities/listing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deal, Listing])],
  controllers: [DealsController],
  providers: [DealsService],
  exports: [DealsService],
})
export class DealsModule {}
