import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crop } from './entities/crop.entity';

@Injectable()
export class FaoSyncService {
  private readonly logger = new Logger(FaoSyncService.name);

  constructor(
    @InjectRepository(Crop)
    private readonly cropRepository: Repository<Crop>,
  ) {}

  async syncCropData() {
    this.logger.log('Starting FAO Data Sync...');
    
    const token = process.env.FAO_API_TOKEN;
    const baseUrl = process.env.FAO_API_BASE_URL || 'https://faostatservices.fao.org/api/v1';

    if (!token) {
      this.logger.error('FAO_API_TOKEN is missing in .env. Skipping sync.');
      return { success: false, message: 'FAO_API_TOKEN is not configured' };
    }

    try {
      // Example 1: Syncing Crop Suitability Requirements
      // Here we would hit the specific GAEZ or FAOSTAT domain for crop requirements
      // For this implementation, we simulate the fetch using the token
      this.logger.log(`Fetching suitability data from ${baseUrl}/en/data/QCL...`);
      
      const response = await fetch(`${baseUrl}/en/data/QCL?area=106&item=15&element=2510&year=2022`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`FAO API responded with status: ${response.status}`);
      }

      const faoData = await response.json();
      this.logger.log(`Received ${faoData?.data?.length || 0} records from FAO.`);

      // Update local database (Mock mapping based on expected FAO structure)
      // Assuming faoData contains optimal ranges and yields for mapping to our crops
      const crops = await this.cropRepository.find();
      let updatedCount = 0;

      for (const crop of crops) {
        // Simulating the update logic based on FAO data mapping
        // In reality, we would map the FAO 'item' code (e.g., 15 for Wheat) to our faoCropCode
        if (faoData.data && faoData.data.some(d => d.itemCode === crop.faoCropCode)) {
          const matchingData = faoData.data.find(d => d.itemCode === crop.faoCropCode);
          
          // Update suitability
          crop.temperatureRangeMin = matchingData.tempMin || crop.temperatureRangeMin;
          crop.temperatureRangeMax = matchingData.tempMax || crop.temperatureRangeMax;
          crop.rainfallRangeMin = matchingData.rainMin || crop.rainfallRangeMin;
          crop.rainfallRangeMax = matchingData.rainMax || crop.rainfallRangeMax;
          
          await this.cropRepository.save(crop);
          updatedCount++;
        }
      }

      this.logger.log(`Successfully updated ${updatedCount} crops with FAO data.`);
      return { 
        success: true, 
        message: `Synced ${updatedCount} crops from FAO.`,
        data: faoData.data 
      };

    } catch (error) {
      this.logger.error(`FAO Sync Failed: ${error.message}`);
      return { success: false, message: `FAO Sync Failed: ${error.message}` };
    }
  }
}
