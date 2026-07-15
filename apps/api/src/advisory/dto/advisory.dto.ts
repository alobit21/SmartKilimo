import { IsString, IsOptional } from 'class-validator';

export class CreateAdvisoryDto {
  @IsString()
  farmId: string;

  @IsString()
  cropId: string;

  @IsString()
  description: string;
}

export class RespondAdvisoryDto {
  @IsString()
  responseNotes: string;
}
