import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import { MarketplaceService } from './marketplace.service';
import { CreateListingDto, UpdateListingDto } from './dto/listing.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@kilimosmart/shared-types';

@Controller('marketplace')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Post('listings')
  @Roles(Role.FARMER)
  @UseInterceptors(FileInterceptor('photo'))
  createListing(
    @Request() req, 
    @Body() createListingDto: CreateListingDto,
    @UploadedFile() file?: any
  ) {
    return this.marketplaceService.create(req.user.id, createListingDto, file);
  }

  @Get('listings')
  @Roles(Role.FARMER, Role.BUYER, Role.ADMIN)
  findAllActiveListings() {
    return this.marketplaceService.findAllActive();
  }

  @Get('my-listings')
  @Roles(Role.FARMER)
  findMyListings(@Request() req) {
    return this.marketplaceService.findAllByFarmer(req.user.id);
  }

  @Get('listings/:id')
  @Roles(Role.FARMER, Role.BUYER, Role.ADMIN)
  findOneListing(@Param('id') id: string) {
    return this.marketplaceService.findOne(id);
  }

  @Put('listings/:id')
  @Roles(Role.FARMER)
  updateListing(@Request() req, @Param('id') id: string, @Body() updateListingDto: UpdateListingDto) {
    return this.marketplaceService.update(id, req.user.id, updateListingDto);
  }

  @Delete('listings/:id')
  @Roles(Role.FARMER)
  deleteListing(@Request() req, @Param('id') id: string) {
    return this.marketplaceService.remove(id, req.user.id);
  }
}
