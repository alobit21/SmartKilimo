import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { FarmerProfile } from './entities/farmer-profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(FarmerProfile)
    private farmerProfileRepository: Repository<FarmerProfile>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    if (!userData.email && !userData.phone) {
      throw new BadRequestException('Email or phone must be provided');
    }
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async findByIdentifier(identifier: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: [
        { email: identifier },
        { phone: identifier }
      ],
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async updateFarmerLocation(userId: string, lat: number, lon: number): Promise<FarmerProfile> {
    const baseUrl = process.env.OSM_NOMINATIM_BASE_URL || 'https://nominatim.openstreetmap.org';
    const url = `${baseUrl}/reverse?format=json&lat=${lat}&lon=${lon}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'KilimoSmart/1.0 (kilimosmart@gmail.com)'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Nominatim API returned ${response.status}`);
      }

      const data = await response.json();
      
      const region = data.address?.state || data.address?.region || 'Unknown Region';
      const district = data.address?.county || data.address?.district || data.address?.city || data.address?.town || 'Unknown District';

      let profile = await this.farmerProfileRepository.findOne({ where: { userId } });
      if (!profile) {
        profile = this.farmerProfileRepository.create({ userId, region, district });
      } else {
        profile.region = region;
        profile.district = district;
      }
      return this.farmerProfileRepository.save(profile);
    } catch (e) {
      console.error('[UsersService] Failed to reverse geocode:', e.message);
      throw new BadRequestException('Could not determine location from coordinates');
    }
  }
}
