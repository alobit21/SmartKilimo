import { IsString, IsNumber, IsOptional, IsEnum, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ListingStatus } from '../entities/listing.entity';

export class CreateListingDto {
  @IsString()
  cropId: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0.1)
  quantity: number;

  @IsString()
  unit: string;

  @Type(() => Number)
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
  @IsString()
  cropId?: string;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsEnum(ListingStatus)
  status?: ListingStatus;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0.1)
  quantity?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  pricePerUnit?: number;
}
