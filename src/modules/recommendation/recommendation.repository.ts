import { Injectable } from '@nestjs/common';
import { Recommendation } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class RecommendationRepository {
  constructor(private readonly prisma: PrismaService) {}

  //create
  async createRecommendation(
    product: string,
    filename: string,
    rating: number,
    comment: string,
    vendorId: number,
  ): Promise<Recommendation> {
    return await this.prisma.recommendation.create({
      data: { product, filename, rating, comment, vendorId },
    });
  }

  //get
  async getRecommendationById(id: number): Promise<Recommendation> {
    return await this.prisma.recommendation.findFirst({ where: { id } });
  }

  async getAllRecommendations(): Promise<Recommendation[]> {
    return await this.prisma.recommendation.findMany();
  }

  async getAllRecommendationsByVendorId(
    vendorId: number,
  ): Promise<Recommendation[]> {
    return await this.prisma.recommendation.findMany({ where: { vendorId } });
  }

  //update
  async updateRecommendationById(
    id: number,
    filename?: string,
    rating?: number,
    comment?: string,
    vendorId?: number,
  ): Promise<Recommendation> {
    return await this.prisma.recommendation.update({
      where: { id },
      data: { filename, rating, comment, vendorId },
    });
  }

  //delete
  async deleteRecommendationById(id: number): Promise<Recommendation> {
    return this.prisma.recommendation.delete({ where: { id } });
  }
}
