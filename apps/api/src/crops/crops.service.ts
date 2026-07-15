import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crop } from './entities/crop.entity';

@Injectable()
export class CropsService {
  constructor(
    @InjectRepository(Crop)
    private cropsRepository: Repository<Crop>,
  ) {}

  async findAll(): Promise<Crop[]> {
    return this.cropsRepository.find({
      order: { marketRank: 'DESC' }
    });
  }

  async findOne(id: string): Promise<Crop> {
    const crop = await this.cropsRepository.findOne({ where: { id } });
    if (!crop) {
      throw new NotFoundException(`Crop with ID ${id} not found`);
    }
    return crop;
  }
}
