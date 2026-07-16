import { Controller, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@kilimosmart/shared-types';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('profile/location')
  @Roles(Role.FARMER)
  updateLocation(@Request() req, @Body() body: { latitude: number; longitude: number }) {
    return this.usersService.updateFarmerLocation(req.user.id, body.latitude, body.longitude);
  }
}
