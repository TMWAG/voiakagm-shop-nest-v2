import { Injectable } from '@nestjs/common';
import { ProductCharacteristic } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ProductCharacteristicRepository {
  constructor(private readonly prisma: PrismaService) {}

  //create
  async createProductCharacteristic(
    parameterId: number,
    productId: number,
    value: string,
  ): Promise<ProductCharacteristic> {
    return await this.prisma.productCharacteristic.create({
      data: { parameterId, productId, value },
    });
  }

  //get
  async getProductCharacteristicById(
    id: number,
  ): Promise<ProductCharacteristic> {
    return await this.prisma.productCharacteristic.findFirst({ where: { id } });
  }

  async getAllProductCharacteristicsByProductId(
    productId: number,
  ): Promise<ProductCharacteristic[]> {
    return await this.prisma.productCharacteristic.findMany({
      where: { productId },
    });
  }

  async getAllProductCharacteristicsByParameterId(
    parameterId: number,
  ): Promise<ProductCharacteristic[]> {
    return await this.prisma.productCharacteristic.findMany({
      where: { parameterId },
    });
  }

  //update
  async updateProductCharacteristicById(
    id: number,
    parameterId?: number,
    value?: string,
  ): Promise<ProductCharacteristic> {
    return await this.prisma.productCharacteristic.update({
      where: { id },
      data: { parameterId, value },
    });
  }

  //delete
  async deleteProductCharacteristicById(
    id: number,
  ): Promise<ProductCharacteristic> {
    return await this.prisma.productCharacteristic.delete({ where: { id } });
  }
}
