import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { User } from '../users/entities/user.entity';
import { Listing } from '../marketplace/entities/listing.entity';
import { Deal } from '../deals/entities/deal.entity';
import { AdvisoryRequest } from '../advisory/entities/advisory-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Listing, Deal, AdvisoryRequest])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
