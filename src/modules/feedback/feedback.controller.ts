import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { DeleteFeedbackDto } from './dto/delete-feedback.dto';
import { GetAllFeedbackByProductIdDto } from './dto/get-all-feedbacks-by-product-id.dto';
import { GetAllFeedbackByUserIdDto } from './dto/get-all-feedbacks-by-user-id.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  createFeedback(@Request() { user }, @Body() dto: CreateFeedbackDto) {
    return this.feedbackService.create(user.id, dto);
  }

  @Get('product')
  getAllProductFeedbacks(@Query() dto: GetAllFeedbackByProductIdDto) {
    return this.feedbackService.getAllFeedbacksByProductId(dto);
  }

  @Get('user')
  getAllUserFeedbacks(@Query() dto: GetAllFeedbackByUserIdDto) {
    return this.feedbackService.getAllFeedbacksByUserId(dto);
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  updateFeedback(@Request() { user }, @Body() dto: UpdateFeedbackDto) {
    return this.feedbackService.updateFeedbackById(user.id, dto);
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  deleteFeedback(@Request() { user }, @Body() dto: DeleteFeedbackDto) {
    return this.feedbackService.deleteFeedbackById(user.id, dto);
  }
}
