import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class RecommendationRepository {
  constructor(private readonly prisma: PrismaService) {}
}
