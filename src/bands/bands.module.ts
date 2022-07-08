import { Module } from '@nestjs/common';
import { BandsService } from './bands.service';
import { BandsResolver } from './bands.resolver';

@Module({
  providers: [BandsService, BandsResolver]
})
export class BandsModule {}
