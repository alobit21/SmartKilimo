import { Controller, Get, Param, UseGuards, Post } from '@nestjs/common';
import { CropsService } from './crops.service';
import { FaoSyncService } from './fao-sync.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@kilimosmart/shared-types';

@Controller('crops')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CropsController {
  constructor(
    private readonly cropsService: CropsService,
    private readonly faoSyncService: FaoSyncService
  ) {}

  @Post('sync-fao')
  @Roles(Role.ADMIN)
  syncFaoData() {
    return this.faoSyncService.syncCropData();
  }

  @Get()
  @Roles(Role.FARMER, Role.BUYER, Role.OFFICER, Role.ADMIN)
  findAll() {
    return this.cropsService.findAll();
  }

  @Get(':id')
  @Roles(Role.FARMER, Role.BUYER, Role.OFFICER, Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.cropsService.findOne(id);
  }
}
