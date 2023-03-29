import { Module } from '@nestjs/common';
import { ProductParameterService } from './product-parameter.service';
import { ProductParameterController } from './product-parameter.controller';
import { ProductParameterRepository } from './product-parameter.repository';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  providers: [ProductParameterService, ProductParameterRepository],
  controllers: [ProductParameterController],
  imports: [PrismaModule],
})
export class ProductParameterModule {}
