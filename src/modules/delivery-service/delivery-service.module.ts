import { Module } from '@nestjs/common';
import { DeliveryServiceService } from './delivery-service.service';
import { DeliveryServiceController } from './delivery-service.controller';
import { DeliveryServiceRepository } from './delivery-service.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [DeliveryServiceService, DeliveryServiceRepository],
  controllers: [DeliveryServiceController],
  imports: [PrismaModule, JwtModule],
})
export class DeliveryServiceModule {}
