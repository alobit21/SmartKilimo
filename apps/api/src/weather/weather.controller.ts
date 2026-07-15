import { Controller, Post, Get, Param, UseGuards, Request } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@kilimosmart/shared-types';

@Controller('weather')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post('farm/:id/fetch')
  @Roles(Role.FARMER)
  fetchWeather(@Request() req, @Param('id') id: string) {
    return this.weatherService.fetchWeatherForFarm(id, req.user.id);
  }

  @Get('farm/:id')
  @Roles(Role.FARMER)
  getLatestWeather(@Param('id') id: string) {
    return this.weatherService.getLatestWeather(id);
  }
}
