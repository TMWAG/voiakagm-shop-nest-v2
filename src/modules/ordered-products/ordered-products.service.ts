import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderService } from '../order/order.service';
import { CreateOrderedProductDto } from './dto/create-ordered-product.dto';
import { DeleteOrderedProductDto } from './dto/delete-ordered-product.dto';
import { UpdateOrderedProductAmountDto } from './dto/update-ordered-product-amount.dto';
import { OrderedProductsRepository } from './ordered-products.repository';

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
  async updateAmount(dto: UpdateOrderedProductAmountDto) {
    await this.getOneOrThrowError(dto.id);
    return await this.repository.updateAmount(dto.id, dto.amount);
  }

  //delete
  async delete(dto: DeleteOrderedProductDto) {
    await this.getOneOrThrowError(dto.id);
    return await this.repository.delete(dto.id);
  }
}
