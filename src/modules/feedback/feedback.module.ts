import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { FeedbackController } from './feedback.controller';
import { FeedbackRepository } from './feedback.repository';
import { FeedbackService } from './feedback.service';

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService, FeedbackRepository],
  imports: [PrismaModule],
})
export class FeedbackModule {}
