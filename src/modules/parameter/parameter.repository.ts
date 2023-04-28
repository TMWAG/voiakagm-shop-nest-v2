import { Injectable } from '@nestjs/common';
import { ProductParameter } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ParameterRepository {
  constructor(private readonly prisma: PrismaService) {}

  //create
  async createParameter(
    name: string,
    categoryId: number,
  ): Promise<ProductParameter> {
    return await this.prisma.productParameter.create({
      data: { name, categoryId },
      include: { category: true },
    });
  }

  //get
  async getAllParameters(): Promise<ProductParameter[]> {
    return await this.prisma.productParameter.findMany({
      include: { category: true },
    });
  }

  async getAllParametersByCategoryId(
    categoryId: number,
  ): Promise<ProductParameter[]> {
    return await this.prisma.productParameter.findMany({
      where: { categoryId },
      include: { category: true },
    });
  }

  async getParameterById(id: number): Promise<ProductParameter> {
    return await this.prisma.productParameter.findFirst({ where: { id } });
  }

  //update
  async updateParameterById(id: number, name?: string, categoryId?: number) {
    return await this.prisma.productParameter.update({
      where: { id },
      data: { name, categoryId },
    });
  }

  async updateParameterNameById(
    id: number,
    name: string,
  ): Promise<ProductParameter> {
    return await this.prisma.productParameter.update({
      where: { id },
      data: { name },
      include: { category: true },
    });
  }

  async updateParameterCategoryById(
    id: number,
    categoryId: number,
  ): Promise<ProductParameter> {
    return await this.prisma.productParameter.update({
      where: { id },
      data: { categoryId },
      include: { category: true },
    });
  }

  //delete
  async deleteParameterById(id: number): Promise<ProductParameter> {
    return await this.prisma.productParameter.delete({
      where: { id },
      include: { category: true },
    });
  }
}
