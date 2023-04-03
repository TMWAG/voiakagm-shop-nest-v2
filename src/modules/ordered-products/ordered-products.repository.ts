import { Injectable } from '@nestjs/common';
import { OrderedProduct } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class OrderedProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  //create
  async create(
    orderId: number,
    productId: number,
    amount: number,
  ): Promise<OrderedProduct> {
    return await this.prisma.orderedProduct.create({
      data: { orderId, productId, amount },
    });
  }

  //get
  async getOne(id: number): Promise<OrderedProduct> {
    return await this.prisma.orderedProduct.findFirst({ where: { id } });
  }

  //update
  async updateAmount(id: number, amount: number): Promise<OrderedProduct> {
    return await this.prisma.orderedProduct.update({
      where: { id },
      data: { amount },
    });
  }

  //delete
  async delete(id: number): Promise<OrderedProduct> {
    return await this.prisma.orderedProduct.delete({ where: { id } });
  }
}
