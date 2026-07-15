import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CreateFarmDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @IsNumber()
  @Min(0.1)
  sizeHectares: number;

  @IsOptional()
  @IsString()
  soilNotes?: string;
}
