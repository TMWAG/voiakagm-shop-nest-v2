import { Module } from '@nestjs/common';
import { ProductCharacteristicService } from './product-characteristic.service';
import { ProductCharacteristicController } from './product-characteristic.controller';
import { ProductCharacteristicRepository } from './product-characteristic.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { ProductModule } from '../product/product.module';
import { ParameterModule } from '../parameter/parameter.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [ProductCharacteristicService, ProductCharacteristicRepository],
  controllers: [ProductCharacteristicController],
  imports: [
    PrismaModule,
    ProductModule,
    ParameterModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class ProductCharacteristicModule {}
