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

    let temp = 25;
    let rainfall = 0;
    let humidity = 50;
    let windSpeed = 5;

    try {
      const apiKey = process.env.OPENWEATHER_API_KEY;
      if (apiKey && apiKey !== 'your-openweather-api-key') {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${farm.latitude}&lon=${farm.longitude}&appid=${apiKey}&units=metric`;
        const res = await fetch(url);
        
        if (res.ok) {
          const data = await res.json();
          temp = data.main?.temp || temp;
          humidity = data.main?.humidity || humidity;
          windSpeed = data.wind?.speed || windSpeed;
          // OpenWeather sometimes provides rainfall in the past 1h
          rainfall = data.rain?.['1h'] || 0;
        } else {
          console.warn('[WeatherService] OpenWeather API responded with error:', res.status);
        }
      } else {
        console.warn('[WeatherService] No valid OpenWeather API key found, using mock data.');
        temp = 22 + Math.random() * 10;
        rainfall = Math.random() * 10;
        humidity = 40 + Math.random() * 40;
        windSpeed = Math.random() * 20;
      }
    } catch (e) {
      console.error('[WeatherService] Failed to fetch weather:', e.message);
    }
    
    const record = this.weatherRepository.create({
      farmId,
      temperature: temp,
      rainfall: rainfall,
      humidity: humidity,
      windSpeed: windSpeed,
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
