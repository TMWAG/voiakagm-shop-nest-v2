import { Module } from '@nestjs/common';
import { TinkoffAcqService } from './tinkoff-acq.service';

@Module({
  providers: [TinkoffAcqService],
  exports: [TinkoffAcqService],
})
export class TinkoffAcqModule {}
