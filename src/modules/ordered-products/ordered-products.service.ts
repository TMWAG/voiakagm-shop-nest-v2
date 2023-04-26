import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderService } from '../order/order.service';
import { CreateOrderedProductDto } from './dto/create-ordered-product.dto';
import { DeleteOrderedProductDto } from './dto/delete-ordered-product.dto';
import { UpdateOrderedProductAmountDto } from './dto/update-ordered-product-amount.dto';
import { OrderedProductsRepository } from './ordered-products.repository';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderedProductsService {
  constructor(
    private readonly repository: OrderedProductsRepository,
    private readonly orderService: OrderService,
  ) {}

  //create
  //add product to cart
  async create(userId: number, dto: CreateOrderedProductDto) {
    const order = await this.orderService.createOrGetCurrent(userId);
    return await this.repository.create(order.id, dto.productId, dto.amount);
  }

  //get
  async getOneOrThrowError(id: number) {
    const orderedProduct = await this.repository.getOne(id);
    if (!orderedProduct)
      throw new NotFoundException(`Товар корзины с id ${id} не найден`);
    return orderedProduct;
  }

  //update
  async updateAmount(userId: number, dto: UpdateOrderedProductAmountDto) {
    const orderedProduct = await this.getOneOrThrowError(dto.id);
    if (orderedProduct.order.user.id !== userId)
      throw new BadRequestException(
        'Данный заказанный товар не числится за этим пользователем',
      );
    if (orderedProduct.order.status !== OrderStatus.NOT_APPROVED)
      throw new BadRequestException(
        'Количество товара можно менять только в текущем заказе',
      );
    return await this.repository.updateAmount(dto.id, dto.amount);
  }

  //delete
  async delete(userId: number, dto: DeleteOrderedProductDto) {
    const orderedProduct = await this.getOneOrThrowError(dto.id);
    if (orderedProduct.order.user.id !== userId)
      throw new BadRequestException(
        'Заказанный товар не числится за этим пользователем',
      );
    if (orderedProduct.order.status !== OrderStatus.NOT_APPROVED)
      throw new BadRequestException(
        'Товары можно удалять только из текущей корзины',
      );
    return await this.repository.delete(dto.id);
  }
}
