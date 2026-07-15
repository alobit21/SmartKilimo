import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { DealsService } from './deals.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role, RequestStatus } from '@kilimosmart/shared-types';

@Controller('deals')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Post()
  @Roles(Role.BUYER)
  createDeal(@Request() req, @Body('listingId') listingId: string) {
    return this.dealsService.createDeal(req.user.id, listingId);
  }

  @Get('my-deals')
  @Roles(Role.BUYER)
  getBuyerDeals(@Request() req) {
    return this.dealsService.getBuyerDeals(req.user.id);
  }

  @Get('farmer-deals')
  @Roles(Role.FARMER)
  getFarmerDeals(@Request() req) {
    return this.dealsService.getFarmerDeals(req.user.id);
  }

  @Patch(':id/respond')
  @Roles(Role.FARMER)
  respondToDeal(
    @Request() req,
    @Param('id') id: string,
    @Body('status') status: RequestStatus
  ) {
    return this.dealsService.respondToDeal(id, req.user.id, status);
  }

  @Delete(':id')
  @Roles(Role.BUYER)
  cancelDeal(@Request() req, @Param('id') id: string) {
    return this.dealsService.cancelDeal(id, req.user.id);
  }
}
