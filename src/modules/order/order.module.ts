import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [OrderService, OrderRepository],
  controllers: [OrderController],
  imports: [PrismaModule, JwtModule],
  exports: [OrderService],
})
export class OrderModule {}
