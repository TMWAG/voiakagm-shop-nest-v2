import { Module } from '@nestjs/common';
import { ProductCharacteristicService } from './product-characteristic.service';
import { ProductCharacteristicController } from './product-characteristic.controller';
import { ProductCharacteristicRepository } from './product-characteristic.repository';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  providers: [ProductCharacteristicService, ProductCharacteristicRepository],
  controllers: [ProductCharacteristicController],
  imports: [PrismaModule],
})
export class ProductCharacteristicModule {}
