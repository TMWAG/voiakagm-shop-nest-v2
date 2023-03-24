import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(name: string): Promise<Category> {
    return await this.prisma.category.create({ data: { name } });
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.prisma.category.findMany();
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    return await this.prisma.category.findFirst({ where: { id } });
  }

  async updateCategoryById(id: number, name: string): Promise<Category> {
    return this.prisma.category.update({ where: { id }, data: { name } });
  }

  async deleteCategoryById(id: number): Promise<Category> {
    return this.prisma.category.delete({ where: { id } });
  }
}
