import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdvisoryRequest } from './entities/advisory-request.entity';
import { CreateAdvisoryDto, RespondAdvisoryDto } from './dto/advisory.dto';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';
import { RequestStatus } from '@kilimosmart/shared-types';
import 'multer';

@Injectable()
export class AdvisoryService {
  constructor(
    @InjectRepository(AdvisoryRequest)
    private advisoryRepository: Repository<AdvisoryRequest>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(farmerId: string, createDto: CreateAdvisoryDto, file?: any): Promise<AdvisoryRequest> {
    let photoUrl: string | undefined = undefined;
    
    if (file) {
      try {
        const uploadResult = await this.cloudinaryService.uploadImage(file);
        photoUrl = uploadResult.secure_url;
      } catch (e) {
        console.error('[Advisory] Image upload failed, saving request without photo:', e.message);
        // Continue without the photo - don't block the advisory request
      }
    }

    const request = this.advisoryRepository.create({
      ...createDto,
      farmerId,
      photoUrl,
      status: RequestStatus.PENDING,
    });

    return this.advisoryRepository.save(request);
  }

  async findAllByFarmer(farmerId: string): Promise<AdvisoryRequest[]> {
    return this.advisoryRepository.find({
      where: { farmerId },
      relations: { farm: true, crop: true, assignedOfficer: true },
      order: { id: 'DESC' }, // Should use createdAt if we added it, but fallback to ID
    });
  }

  async findAllPending(): Promise<AdvisoryRequest[]> {
    return this.advisoryRepository.find({
      where: { status: RequestStatus.PENDING },
      relations: { farm: true, crop: true, farmer: true },
    });
  }

  async respondToRequest(id: string, officerId: string, respondDto: RespondAdvisoryDto): Promise<AdvisoryRequest> {
    const request = await this.advisoryRepository.findOne({ where: { id } });
    if (!request) {
      throw new NotFoundException(`Advisory request with ID ${id} not found`);
    }

    request.status = RequestStatus.ACCEPTED;
    request.assignedOfficerId = officerId;
    request.responseNotes = respondDto.responseNotes;
    
    return this.advisoryRepository.save(request);
  }
}
