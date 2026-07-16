import { Controller, Get, Post, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { FarmsService } from './farms.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@kilimosmart/shared-types';

@Controller('farms')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Post()
  @Roles(Role.FARMER)
  create(@Request() req, @Body() createFarmDto: CreateFarmDto) {
    return this.farmsService.create(req.user.id, createFarmDto);
  }

  @Get()
  @Roles(Role.FARMER)
  findAll(@Request() req) {
    return this.farmsService.findAllByFarmer(req.user.id);
  }

  @Get(':id')
  @Roles(Role.FARMER)
  findOne(@Request() req, @Param('id') id: string) {
    return this.farmsService.findOne(id, req.user.id);
  }

  @Patch(':id/status')
  @Roles(Role.FARMER)
  updateStatus(
    @Request() req,
    @Param('id') id: string,
    @Body() body: { status: string; growthProgress: number },
  ) {
    return this.farmsService.updateStatus(id, req.user.id, body.status, body.growthProgress);
  }
}
