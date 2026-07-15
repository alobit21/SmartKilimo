import { Module } from '@nestjs/common';
import { AdvisoryController } from './advisory.controller';

@Module({
  controllers: [AdvisoryController]
})
export class AdvisoryModule {}
