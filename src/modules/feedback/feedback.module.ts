import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { ProductModule } from '../product/product.module';
import { UsersModule } from '../users/users.module';
import { FeedbackController } from './feedback.controller';
import { FeedbackRepository } from './feedback.repository';
import { FeedbackService } from './feedback.service';

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService, FeedbackRepository],
  imports: [PrismaModule, ProductModule, UsersModule],
})
export class FeedbackModule {}
