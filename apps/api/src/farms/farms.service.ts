import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farm } from './entities/farm.entity';
import { CreateFarmDto } from './dto/create-farm.dto';

@Injectable()
export class FarmsService {
  constructor(
    @InjectRepository(Farm)
    private farmsRepository: Repository<Farm>,
  ) {}

  async create(farmerId: string, createFarmDto: CreateFarmDto): Promise<Farm> {
    const farm = this.farmsRepository.create({
      ...createFarmDto,
      farmerId,
    });
    return this.farmsRepository.save(farm);
  }

  async findAllByFarmer(farmerId: string): Promise<Farm[]> {
    return this.farmsRepository.find({ where: { farmerId } });
  }

  async findOne(id: string, farmerId: string): Promise<Farm> {
    const farm = await this.farmsRepository.findOne({ where: { id, farmerId } });
    if (!farm) {
      throw new NotFoundException(`Farm with ID ${id} not found`);
    }
    return farm;
  }

  async updateStatus(id: string, farmerId: string, status: string, growthProgress: number): Promise<Farm> {
    const farm = await this.findOne(id, farmerId);
    farm.status = status;
    farm.growthProgress = growthProgress;
    return this.farmsRepository.save(farm);
  }
}
