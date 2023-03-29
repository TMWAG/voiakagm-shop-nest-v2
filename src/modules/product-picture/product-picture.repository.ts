import { Injectable } from '@nestjs/common';
import { ProductPicture } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ProductPictureRepository {
  constructor(private readonly prisma: PrismaService) {}

  //create
  async createProductPicture(
    productId: number,
    filename: string,
  ): Promise<ProductPicture> {
    return await this.prisma.productPicture.create({
      data: {
        filename,
        product: {
          connect: {
            id: Number(productId),
          },
        },
      },
    });
  }

  //delete
  async deleteProductPictureById(id: number): Promise<ProductPicture> {
    return await this.prisma.productPicture.delete({ where: { id } });
  }

  async deleteAllPicturesByProductId(productId: number) {
    return await this.prisma.productPicture.deleteMany({
      where: { productId },
    });
  }
}
