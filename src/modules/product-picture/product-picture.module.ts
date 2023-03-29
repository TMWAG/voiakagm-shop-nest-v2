import { Module } from '@nestjs/common';
import { ProductPictureService } from './product-picture.service';
import { ProductPictureController } from './product-picture.controller';
import { ProductPictureRepository } from './product-picture.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [ProductPictureService, ProductPictureRepository],
  controllers: [ProductPictureController],
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: [ProductPictureService],
})
export class ProductPictureModule {}
