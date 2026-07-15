import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherRecord } from './entities/weather-record.entity';
import { Farm } from '../farms/entities/farm.entity';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(WeatherRecord)
    private weatherRepository: Repository<WeatherRecord>,
    @InjectRepository(Farm)
    private farmsRepository: Repository<Farm>,
  ) {}

  async fetchWeatherForFarm(farmId: string, farmerId: string): Promise<WeatherRecord> {
    const farm = await this.farmsRepository.findOne({ where: { id: farmId, farmerId } });
    if (!farm) {
      throw new NotFoundException(`Farm with ID ${farmId} not found`);
    }

    // MOCK INTEGRATION: Simulating OpenWeather API fetch for Phase 1
    // We generate realistic weather data based on latitude/longitude
    const mockTemp = 22 + Math.random() * 10; // 22-32 C
    const mockRainfall = Math.random() * 100; // 0-100 mm
    
    const record = this.weatherRepository.create({
      farmId,
      temperature: mockTemp,
      rainfall: mockRainfall,
      humidity: 40 + Math.random() * 40,
      windSpeed: Math.random() * 20,
    });

    return this.weatherRepository.save(record);
  }

  async getLatestWeather(farmId: string): Promise<WeatherRecord> {
    const record = await this.weatherRepository.findOne({
      where: { farmId },
      order: { fetchedAt: 'DESC' },
    });
    
    if (!record) {
      throw new NotFoundException(`No weather records found for farm ${farmId}`);
    }
    return record;
  }
}
