import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recommendation } from './entities/recommendation.entity';
import { WeatherService } from '../weather/weather.service';
import { CropsService } from '../crops/crops.service';

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectRepository(Recommendation)
    private recommendationsRepository: Repository<Recommendation>,
    private weatherService: WeatherService,
    private cropsService: CropsService,
  ) {}

  async generateForFarm(farmId: string): Promise<Recommendation[]> {
    // 1. Get the latest weather for the farm (or throw if none)
    const weather = await this.weatherService.getLatestWeather(farmId);
    
    // 2. Get all available crops
    const allCrops = await this.cropsService.findAll();

    const newRecommendations: Recommendation[] = [];

    // 3. SDD Logic: Compare current weather conditions vs FAO crop requirements
    for (const crop of allCrops) {
      const isTempSuitable = 
        weather.temperature >= crop.temperatureRangeMin && 
        weather.temperature <= crop.temperatureRangeMax;
        
      const isRainfallSuitable = 
        weather.rainfall >= crop.rainfallRangeMin && 
        weather.rainfall <= crop.rainfallRangeMax;

      const isSuitable = isTempSuitable && isRainfallSuitable;

      const rec = this.recommendationsRepository.create({
        farmId,
        cropId: crop.id,
        suitable: isSuitable,
        weatherSnapshotJson: {
          temperature: weather.temperature,
          rainfall: weather.rainfall,
          humidity: weather.humidity
        }
      });
      
      newRecommendations.push(rec);
    }

    // Save all new recommendations to DB
    return this.recommendationsRepository.save(newRecommendations);
  }

  async getLatestForFarm(farmId: string): Promise<Recommendation[]> {
    return this.recommendationsRepository.find({
      where: { farmId },
      relations: ['crop'],
      order: { generatedAt: 'DESC' },
    });
  }
}
