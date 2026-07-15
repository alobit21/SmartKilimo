import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherRecord } from './entities/weather-record.entity';
import { Farm } from '../farms/entities/farm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherRecord, Farm])],
  controllers: [WeatherController],
  providers: [WeatherService],
  exports: [WeatherService]
})
export class WeatherModule {}
