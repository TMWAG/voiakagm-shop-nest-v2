import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { VendorRepository } from './vendor.repository';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  providers: [VendorService, VendorRepository],
  controllers: [VendorController],
  imports: [PrismaModule],
})
export class VendorModule {}
