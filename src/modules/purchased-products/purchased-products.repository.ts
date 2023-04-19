import { Injectable } from '@nestjs/common';
import { PurchasedProducts } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PurchasedProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, productId: number): Promise<PurchasedProducts> {
    return await this.prisma.purchasedProducts.create({
      data: { userId, productId },
    });
  }

  async getProductsByUserId(userId: number): Promise<PurchasedProducts[]> {
    return await this.prisma.purchasedProducts.findMany({ where: { userId } });
  }
}
