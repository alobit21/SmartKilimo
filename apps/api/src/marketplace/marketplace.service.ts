import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listing, ListingStatus } from './entities/listing.entity';
import { CreateListingDto, UpdateListingDto } from './dto/listing.dto';

@Injectable()
export class MarketplaceService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
  ) {}

  async create(farmerId: string, createListingDto: CreateListingDto): Promise<Listing> {
    const listing = this.listingRepository.create({
      ...createListingDto,
      farmerId,
      status: ListingStatus.ACTIVE,
    });
    return this.listingRepository.save(listing);
  }

  async findAllActive(): Promise<Listing[]> {
    return this.listingRepository.find({
      where: { status: ListingStatus.ACTIVE },
      relations: ['farmer', 'crop'],
    });
  }

  async findAllByFarmer(farmerId: string): Promise<Listing[]> {
    return this.listingRepository.find({
      where: { farmerId },
      relations: ['crop'],
    });
  }

  async findOne(id: string): Promise<Listing> {
    const listing = await this.listingRepository.findOne({
      where: { id },
      relations: ['farmer', 'crop'],
    });
    if (!listing) {
      throw new NotFoundException(`Listing with ID ${id} not found`);
    }
    return listing;
  }

  async update(id: string, farmerId: string, updateListingDto: UpdateListingDto): Promise<Listing> {
    const listing = await this.findOne(id);
    if (listing.farmerId !== farmerId) {
      throw new UnauthorizedException('You can only update your own listings');
    }
    
    Object.assign(listing, updateListingDto);
    return this.listingRepository.save(listing);
  }
}
