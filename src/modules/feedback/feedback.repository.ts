import { Injectable } from '@nestjs/common';
import { ProductFeedback } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class FeedbackRepository {
  constructor(private readonly prisma: PrismaService) {}
  //create
  async createFeedback(
    userId: number,
    productId: number,
    text: string,
    rating: number,
  ): Promise<ProductFeedback> {
    return await this.prisma.productFeedback.create({
      data: { userId, productId, text, rating },
    });
  }

  //get
  async getFeedbackById(id: number): Promise<ProductFeedback> {
    return this.prisma.productFeedback.findFirst({ where: { id } });
  }

  async getAllFeedbacksByProductId(
    productId: number,
  ): Promise<ProductFeedback[]> {
    return await this.prisma.productFeedback.findMany({ where: { productId } });
  }

  async getAllFeedbacksByUserId(userId: number): Promise<ProductFeedback[]> {
    return await this.prisma.productFeedback.findMany({ where: { userId } });
  }

  async getFeedbackByUserIdAndProductId(
    userId: number,
    productId: number,
  ): Promise<ProductFeedback> {
    return await this.prisma.productFeedback.findFirst({
      where: { userId, productId },
    });
  }

  //update
  async updateFeedbackById(
    id: number,
    text?: string,
    rating?: number,
  ): Promise<ProductFeedback> {
    return await this.prisma.productFeedback.update({
      where: { id },
      data: { text, rating },
    });
  }

  //delete
  async deleteFeedbackById(id: number): Promise<ProductFeedback> {
    return await this.prisma.productFeedback.delete({ where: { id } });
  }
}
