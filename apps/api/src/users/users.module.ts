import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FarmerProfile } from './entities/farmer-profile.entity';
import { BuyerProfile } from './entities/buyer-profile.entity';
import { OfficerProfile } from './entities/officer-profile.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, FarmerProfile, BuyerProfile, OfficerProfile])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
