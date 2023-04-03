import { Module } from '@nestjs/common';
import { OrderedProductsService } from './ordered-products.service';
import { OrderedProductsController } from './ordered-products.controller';
import { OrderedProductsRepository } from './ordered-products.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { OrderModule } from '../order/order.module';

@Module({
  providers: [OrderedProductsService, OrderedProductsRepository],
  controllers: [OrderedProductsController],
  imports: [PrismaModule, OrderModule],
})
export class OrderedProductsModule {}
