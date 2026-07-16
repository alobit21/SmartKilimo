import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, UseInterceptors, UploadedFile, Request } from '@nestjs/common';
import { AdvisoryService } from './advisory.service';
import { CreateAdvisoryDto, RespondAdvisoryDto } from './dto/advisory.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@kilimosmart/shared-types';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';

@Controller('advisory')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdvisoryController {
  constructor(private readonly advisoryService: AdvisoryService) {}

  @Post()
  @Roles(Role.FARMER)
  @UseInterceptors(FileInterceptor('photo'))
  createRequest(
    @Request() req, 
    @Body() createDto: CreateAdvisoryDto,
    @UploadedFile() file?: any
  ) {
    return this.advisoryService.create(req.user.id, createDto, file);
  }

  @Get('my-requests')
  @Roles(Role.FARMER)
  getMyRequests(@Request() req) {
    return this.advisoryService.findAllByFarmer(req.user.id);
  }

  @Get('pending')
  @Roles(Role.OFFICER)
  getPendingRequests() {
    return this.advisoryService.findAllPending();
  }

  @Get('officer-stats')
  @Roles(Role.OFFICER)
  getOfficerStats(@Request() req) {
    return this.advisoryService.getOfficerStats(req.user.id);
  }

  @Patch(':id/respond')
  @Roles(Role.OFFICER)
  respondToRequest(
    @Request() req,
    @Param('id') id: string,
    @Body() respondDto: RespondAdvisoryDto
  ) {
    return this.advisoryService.respondToRequest(id, req.user.id, respondDto);
  }

  @Patch(':id')
  @Roles(Role.FARMER)
  updateRequest(
    @Request() req,
    @Param('id') id: string,
    @Body() updateDto: Partial<CreateAdvisoryDto>
  ) {
    return this.advisoryService.update(id, req.user.id, updateDto);
  }

  @Delete(':id')
  @Roles(Role.FARMER)
  deleteRequest(
    @Request() req,
    @Param('id') id: string
  ) {
    return this.advisoryService.remove(id, req.user.id);
  }
}
