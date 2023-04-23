import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersAddressesModule } from '../users-addresses/users-addresses.module';
import { TinkoffAcqModule } from '../tinkoff-acq/tinkoff-acq.module';
import { PurchasedProductsModule } from '../purchased-products/purchased-products.module';

@Module({
  providers: [OrderService, OrderRepository],
  controllers: [OrderController],
  imports: [
    PrismaModule,
    JwtModule,
    UsersAddressesModule,
    TinkoffAcqModule,
    PurchasedProductsModule,
  ],
  exports: [OrderService],
})
export class OrderModule {}
