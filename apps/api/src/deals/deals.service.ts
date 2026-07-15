import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deal } from './entities/deal.entity';
import { Listing } from '../marketplace/entities/listing.entity';
import { RequestStatus } from '@kilimosmart/shared-types';

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(Deal)
    private dealRepository: Repository<Deal>,
    @InjectRepository(Listing)
    private listingRepository: Repository<Listing>,
  ) {}

  async createDeal(buyerId: string, listingId: string): Promise<Deal> {
    const listing = await this.listingRepository.findOne({ where: { id: listingId } });
    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.farmerId === buyerId) {
      throw new BadRequestException('You cannot buy your own listing');
    }

    const deal = this.dealRepository.create({
      listingId,
      buyerId,
      farmerId: listing.farmerId,
      status: RequestStatus.PENDING,
    });

    return this.dealRepository.save(deal);
  }

  async getFarmerDeals(farmerId: string): Promise<Deal[]> {
    return this.dealRepository.find({
      where: { farmerId },
      relations: { listing: { crop: true }, buyer: true },
      order: { createdAt: 'DESC' },
    });
  }

  async getBuyerDeals(buyerId: string): Promise<Deal[]> {
    return this.dealRepository.find({
      where: { buyerId },
      relations: { listing: { crop: true }, farmer: true },
      order: { createdAt: 'DESC' },
    });
  }

  async respondToDeal(dealId: string, farmerId: string, status: RequestStatus): Promise<Deal> {
    if (status !== RequestStatus.ACCEPTED && status !== RequestStatus.REJECTED) {
      throw new BadRequestException('Invalid status update');
    }

    const deal = await this.dealRepository.findOne({ where: { id: dealId, farmerId } });
    if (!deal) {
      throw new NotFoundException('Deal not found');
    }

    deal.status = status;
    deal.respondedAt = new Date();
    
    return this.dealRepository.save(deal);
  }

  async cancelDeal(dealId: string, buyerId: string): Promise<void> {
    const deal = await this.dealRepository.findOne({ where: { id: dealId, buyerId } });
    if (!deal) {
      throw new NotFoundException('Deal not found');
    }
    if (deal.status !== RequestStatus.PENDING) {
      throw new BadRequestException('Can only cancel pending deals');
    }
    await this.dealRepository.remove(deal);
  }
}
