import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CropsService } from './crops.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('crops')
@UseGuards(JwtAuthGuard)
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Get()
  findAll() {
    return this.cropsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cropsService.findOne(id);
  }
}
