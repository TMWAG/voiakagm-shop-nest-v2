import { Module } from '@nestjs/common';
import { PurchasedProductsService } from './purchased-products.service';
import { PrismaModule } from 'src/database/prisma.module';
import { PurchasedProductsRepository } from './purchased-products.repository';

@Module({
  providers: [PurchasedProductsService, PurchasedProductsRepository],
  imports: [PrismaModule],
  exports: [PurchasedProductsService],
})
export class PurchasedProductsModule {}
