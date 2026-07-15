import { IsString, IsNumber, IsOptional, IsEnum, Min } from 'class-validator';
import { ListingStatus } from '../entities/listing.entity';

export class CreateListingDto {
  @IsString()
  cropId: string;

  @IsNumber()
  @Min(0.1)
  quantity: number;

  @IsString()
  unit: string;

  @IsNumber()
  @Min(1)
  pricePerUnit: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;
}

export class UpdateListingDto {
  @IsOptional()
  @IsEnum(ListingStatus)
  status?: ListingStatus;

  @IsOptional()
  @IsNumber()
  @Min(0.1)
  quantity?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  pricePerUnit?: number;
}
