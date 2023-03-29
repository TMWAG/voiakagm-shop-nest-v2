import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { httpExceptionMessages } from 'src/errors/http-exceptions.errors';
import { ProductService } from '../product/product.service';
import { UsersService } from '../users/users.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { DeleteFeedbackDto } from './dto/delete-feedback.dto';
import { GetAllFeedbackByProductIdDto } from './dto/get-all-feedbacks-by-product-id.dto';
import { GetAllFeedbackByUserIdDto } from './dto/get-all-feedbacks-by-user-id.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { FeedbackRepository } from './feedback.repository';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly repository: FeedbackRepository,
    private readonly productService: ProductService,
    private readonly usersService: UsersService,
  ) {}

  //create
  async create(userId: number, dto: CreateFeedbackDto) {
    await this.usersService.getOneUserByIdOrThrowError(userId);
    await this.productService.getProductByIdOrThrowError(dto.productId);
    await this.checkIsProductHasUserFeedbackOrThrowError(userId, dto.productId);
    return await this.repository.createFeedback(
      userId,
      dto.productId,
      dto.text,
      dto.rating,
    );
  }

  //get
  async getAllFeedbacksByProductId(dto: GetAllFeedbackByProductIdDto) {
    try {
      await this.productService.getProductByIdOrThrowError(
        Number(dto.productId),
      );
      return await this.repository.getAllFeedbacksByProductId(
        Number(dto.productId),
      );
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async getAllFeedbacksByUserId(dto: GetAllFeedbackByUserIdDto) {
    try {
      await this.usersService.getOneUserByIdOrThrowError(Number(dto.userId));
      return await this.repository.getAllFeedbacksByUserId(Number(dto.userId));
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async getFeedbackByIdOrThrowError(id: number) {
    const feedback = await this.repository.getFeedbackById(id);
    if (!feedback)
      throw new NotFoundException(httpExceptionMessages.notFound.feedback(id));
    return feedback;
  }

  //update
  async updateFeedbackById(userId: number, dto: UpdateFeedbackDto) {
    try {
      await this.checkFeedbackUserOwnershipOrThrowError(dto.id, userId);
      return await this.repository.updateFeedbackById(
        dto.id,
        dto.text,
        dto.rating,
      );
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  //delete
  async deleteFeedbackById(userId: number, dto: DeleteFeedbackDto) {
    try {
      await this.checkFeedbackUserOwnershipOrThrowError(dto.id, userId);
      return await this.repository.deleteFeedbackById(dto.id);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  //utils
  async checkFeedbackUserOwnershipOrThrowError(id: number, userId: number) {
    const feedback = this.getFeedbackByIdOrThrowError(id);
    if ((await feedback).userId !== userId)
      throw new ForbiddenException('Вы не являетесь автором данного отзыва');
    return feedback;
  }

  async checkIsProductHasUserFeedbackOrThrowError(
    userId: number,
    productId: number,
  ) {
    const feedback = await this.repository.getFeedbackByUserIdAndProductId(
      userId,
      productId,
    );
    if (feedback)
      throw new ForbiddenException('Вы уже оставили отзыв на этот товар');
    return;
  }
}
