import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendationsController } from './recommendations.controller';
import { RecommendationsService } from './recommendations.service';
import { Recommendation } from './entities/recommendation.entity';
import { WeatherModule } from '../weather/weather.module';
import { CropsModule } from '../crops/crops.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recommendation]),
    WeatherModule,
    CropsModule
  ],
  controllers: [RecommendationsController],
  providers: [RecommendationsService],
  exports: [RecommendationsService]
})
export class RecommendationsModule {}
