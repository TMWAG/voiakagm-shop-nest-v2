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
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { DeleteFeedbackDto } from './dto/delete-feedback.dto';
import { GetAllFeedbackByProductIdDto } from './dto/get-all-feedbacks-by-product-id.dto';
import { GetAllFeedbackByUserIdDto } from './dto/get-all-feedbacks-by-user-id.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { FeedbackEntity } from './entities/feeedback.entity';
import { FeedbackService } from './feedback.service';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @ApiOperation({ summary: 'Создание отзыва' })
  @ApiOkResponse({
    description: 'Отзыв успешно добавлен',
    type: FeedbackEntity,
  })
  @ApiBadRequestResponse({
    description: 'Не указан id товара и/или текст и/или оценка',
  })
  @ApiNotFoundResponse({
    description: 'Не найден товар/пользователь с указанным id',
  })
  @ApiUnauthorizedResponse({
    description: 'Нет токена авторизации',
  })
  @Post('create')
  @UseGuards(JwtAuthGuard)
  createFeedback(@Request() { user }, @Body() dto: CreateFeedbackDto) {
    return this.feedbackService.create(user.id, dto);
  }

  @ApiOperation({ summary: 'Получение всех отзывов товара' })
  @ApiOkResponse({
    description: 'Успешное получение массива всех отзывов товара',
    type: [FeedbackEntity],
  })
  @ApiBadRequestResponse({
    description: 'Не указан id товара',
  })
  @Get('product')
  getAllProductFeedbacks(@Query() dto: GetAllFeedbackByProductIdDto) {
    return this.feedbackService.getAllFeedbacksByProductId(dto);
  }

  @ApiOperation({ summary: 'Получение всех отзывов пользователя' })
  @ApiOkResponse({
    description: 'Успешное получение массива всех отзывов пользователя',
    type: [FeedbackEntity],
  })
  @ApiBadRequestResponse({
    description: 'Не указан id пользователя',
  })
  @Get('user')
  getAllUserFeedbacks(@Query() dto: GetAllFeedbackByUserIdDto) {
    return this.feedbackService.getAllFeedbacksByUserId(dto);
  }

  @ApiOperation({ summary: 'Изменение текста и/или оценки отзыва' })
  @ApiOkResponse({
    description: 'Отзыв успешно обновлён',
    type: FeedbackEntity,
  })
  @ApiNotFoundResponse({
    description: 'Не найден отзыв с указанным Id',
  })
  @ApiBadRequestResponse({
    description: 'Не указан id отзыва и оценка и/или текст',
  })
  @ApiUnauthorizedResponse({
    description: 'Нет токена авторизации',
  })
  @Patch('update')
  @UseGuards(JwtAuthGuard)
  updateFeedback(@Request() { user }, @Body() dto: UpdateFeedbackDto) {
    return this.feedbackService.updateFeedbackById(user.id, dto);
  }

  @ApiOperation({ summary: 'Удаление отзыва' })
  @ApiOkResponse({
    description: 'Отзыв успешно удалён',
    type: FeedbackEntity,
  })
  @ApiNotFoundResponse({
    description: 'Не найден отзыв с указанным Id',
  })
  @ApiBadRequestResponse({ description: 'Не указан Id отзыва' })
  @ApiUnauthorizedResponse({
    description: 'нет токена авторизации',
  })
  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  deleteFeedback(@Request() { user }, @Body() dto: DeleteFeedbackDto) {
    return this.feedbackService.deleteFeedbackById(user.id, dto);
  }
}
