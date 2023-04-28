import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  //create
  async createProduct(
    name: string,
    vendorId: number,
    categoryId: number,
    price: number,
    description: string,
    used: boolean,
    amount?: number,
  ): Promise<Product> {
    return await this.prisma.product.create({
      data: { name, vendorId, categoryId, price, description, used, amount },
      include: { category: true, vendor: true },
    });
  }

  //get
  async getAllProducts(options): Promise<Product[]> {
    return await this.prisma.product.findMany(options);
  }

  async getProductById(id: number): Promise<Product> {
    return await this.prisma.product.findFirst({
      where: { id },
      include: {
        category: true,
        vendor: true,
        pictures: true,
        characteristics: {
          select: {
            parameter: { select: { name: true } },
            value: true,
          },
        },
      },
    });
  }

  //update
  async updateProductById(
    id: number,
    name?: string,
    vendorId?: number,
    categoryId?: number,
    description?: string,
    price?: number,
    discount?: number,
    amount?: number,
  ) {
    return await this.prisma.product.update({
      where: { id },
      data: {
        name,
        vendorId,
        categoryId,
        description,
        price,
        discount,
        amount,
      },
    });
  }

  async updateProductNameById(id: number, name: string): Promise<Product> {
    return await this.prisma.product.update({
      where: { id },
      data: { name },
      include: { category: true, vendor: true },
    });
  }

  async updateProductVendorById(
    id: number,
    vendorId: number,
  ): Promise<Product> {
    return await this.prisma.product.update({
      where: { id },
      data: { vendorId },
      include: { category: true, vendor: true },
    });
  }

  async updateProductCategoryById(
    id: number,
    categoryId: number,
  ): Promise<Product> {
    return await this.prisma.product.update({
      where: { id },
      data: { categoryId },
      include: { category: true, vendor: true },
    });
  }

  async updateProductDescriptionById(
    id: number,
    description: string,
  ): Promise<Product> {
    return await this.prisma.product.update({
      where: { id },
      data: { description },
      include: { category: true, vendor: true },
    });
  }

  async updateProductPriceById(id: number, price: number): Promise<Product> {
    return await this.prisma.product.update({
      where: { id },
      data: { price },
      include: { category: true, vendor: true },
    });
  }

  async updateProductDiscountById(
    id: number,
    discount: number,
  ): Promise<Product> {
    return await this.prisma.product.update({
      where: { id },
      data: { discount },
      include: { category: true, vendor: true },
    });
  }

  async updateProductAmountById(id: number, amount: number): Promise<Product> {
    return await this.prisma.product.update({
      where: { id },
      data: { amount },
      include: { category: true, vendor: true },
    });
  }

  async updateProductSoldById(id: number, sold: number): Promise<Product> {
    return await this.prisma.product.update({
      where: { id },
      data: { sold },
      include: { category: true, vendor: true },
    });
  }

  async deleteProductById(id: number): Promise<Product> {
    return await this.prisma.product.delete({
      where: { id },
      include: { category: true, vendor: true },
    });
  }
}
