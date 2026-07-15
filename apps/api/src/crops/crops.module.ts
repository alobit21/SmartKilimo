import { Module } from '@nestjs/common';
import { CropsController } from './crops.controller';

@Module({
  controllers: [CropsController]
})
export class CropsModule {}
