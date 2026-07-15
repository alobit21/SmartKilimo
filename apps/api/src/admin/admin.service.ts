import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Listing } from '../marketplace/entities/listing.entity';
import { Deal } from '../deals/entities/deal.entity';
import { AdvisoryRequest } from '../advisory/entities/advisory-request.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Listing) private listingRepository: Repository<Listing>,
    @InjectRepository(Deal) private dealRepository: Repository<Deal>,
    @InjectRepository(AdvisoryRequest) private advisoryRepository: Repository<AdvisoryRequest>,
  ) {}

  async getDashboardStats() {
    const totalUsers = await this.userRepository.count();
    const totalListings = await this.listingRepository.count();
    const totalDeals = await this.dealRepository.count();
    const totalAdvisoryRequests = await this.advisoryRepository.count();

    const pendingAdvisories = await this.advisoryRepository.count({ where: { status: 'PENDING' as any } });
    const pendingDeals = await this.dealRepository.count({ where: { status: 'PENDING' as any } });

    return {
      totalUsers,
      totalListings,
      totalDeals,
      totalAdvisoryRequests,
      pendingAdvisories,
      pendingDeals,
    };
  }

  async getRecentUsers() {
    const users = await this.userRepository.find({
      order: { createdAt: 'DESC' },
      take: 10,
    });
    
    return users.map(user => ({
      id: user.id,
      email: user.email || user.phone,
      name: user.email ? user.email.split('@')[0] : 'User',
      role: user.role,
      createdAt: user.createdAt,
      isActive: true
    }));
  }
}
