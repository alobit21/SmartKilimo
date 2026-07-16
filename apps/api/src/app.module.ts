import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from './database/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FarmsModule } from './farms/farms.module';
import { CropsModule } from './crops/crops.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { DealsModule } from './deals/deals.module';
import { AdvisoryModule } from './advisory/advisory.module';
import { WeatherModule } from './weather/weather.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './common/cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    TypeOrmModule.forRoot({ ...dataSourceOptions, synchronize: true }),
    UsersModule, FarmsModule, CropsModule, RecommendationsModule, MarketplaceModule, DealsModule, AdvisoryModule, WeatherModule, AdminModule, AuthModule, CloudinaryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
