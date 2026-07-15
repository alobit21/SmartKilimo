import { Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@kilimosmart/shared-types';

@Controller('recommendations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Post('farm/:id/generate')
  @Roles(Role.FARMER, Role.ADMIN)
  generate(@Param('id') id: string) {
    return this.recommendationsService.generateForFarm(id);
  }

  @Get('farm/:id')
  @Roles(Role.FARMER, Role.ADMIN)
  getForFarm(@Param('id') id: string) {
    return this.recommendationsService.getLatestForFarm(id);
  }
}
