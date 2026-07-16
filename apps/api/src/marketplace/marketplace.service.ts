import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listing, ListingStatus } from './entities/listing.entity';
import { CreateListingDto, UpdateListingDto } from './dto/listing.dto';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';
import 'multer';

@Injectable()
export class MarketplaceService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(farmerId: string, createListingDto: CreateListingDto, file?: any): Promise<Listing> {
    let photoUrl: string | undefined = undefined;
    
    if (file) {
      try {
        const uploadResult = await this.cloudinaryService.uploadImage(file);
        photoUrl = uploadResult.secure_url;
      } catch (e) {
        console.error('[Marketplace] Image upload failed:', e.message);
      }
    }

    const listing = this.listingRepository.create({
      ...createListingDto,
      farmerId,
      photoUrl,
      status: ListingStatus.ACTIVE,
    });
    return this.listingRepository.save(listing);
  }

  async findAllActive(): Promise<Listing[]> {
    return this.listingRepository.find({
      where: { status: ListingStatus.ACTIVE },
      relations: { farmer: { farmerProfile: true }, crop: true },
    });
  }

  async getPriceSummary(): Promise<any[]> {
    // We get all active listings to calculate average price per crop
    const listings = await this.findAllActive();
    
    // Group by cropId
    const summary = {};
    for (const listing of listings) {
      if (!listing.crop) continue;
      const cropName = listing.crop.name;
      
      if (!summary[cropName]) {
        summary[cropName] = { cropName, total: 0, count: 0, lastPrice: 0, trend: 'up' };
      }
      
      summary[cropName].total += Number(listing.pricePerUnit);
      summary[cropName].count += 1;
      // Just picking the last one as a mock "last price" to generate a trend
      summary[cropName].lastPrice = Number(listing.pricePerUnit); 
    }
    
    // Calculate averages and format trend
    return Object.values(summary).map((data: any) => {
      const avg = Math.floor(data.total / data.count);
      // Mock trend for visual appeal: if last price > avg, trend is up, else down
      const trend = data.lastPrice >= avg ? 'up' : 'down';
      return {
        cropName: data.cropName,
        averagePrice: avg,
        unit: 'Kilo',
        trend
      };
    });
  }

  async findAllByFarmer(farmerId: string): Promise<Listing[]> {
    return this.listingRepository.find({
      where: { farmerId },
      relations: { crop: true },
    });
  }

  async findOne(id: string): Promise<Listing> {
    const listing = await this.listingRepository.findOne({
      where: { id },
      relations: { farmer: true, crop: true },
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

  async remove(id: string, farmerId: string): Promise<void> {
    const listing = await this.findOne(id);
    if (listing.farmerId !== farmerId) {
      throw new UnauthorizedException('You can only delete your own listings');
    }
    
    await this.listingRepository.remove(listing);
  }
}
