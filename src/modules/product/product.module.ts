import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductPictureModule } from '../product-picture/product-picture.module';
import { CategoryModule } from '../category/category.module';
import { VendorModule } from '../vendor/vendor.module';

@Module({
  providers: [ProductService, ProductRepository],
  controllers: [ProductController],
  imports: [
    PrismaModule,
    CategoryModule,
    VendorModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: { expiresIn: '24h' },
    }),
    ProductPictureModule,
  ],
  exports: [ProductService],
})
export class ProductModule {}
