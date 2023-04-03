import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GetAllOrdersDto } from './dto/get-all-orders.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly repository: OrderRepository) {}

  //create
  async createOrGetCurrent(userId: number) {
    const order = await this.repository.getCurrentByUserId(userId);
    if (!order) {
      return await this.repository.create(userId);
    }
    return order;
  }

  //get
  async getAll(dto: GetAllOrdersDto) {
    return await this.repository.getAll(
      this.constructSearchOptionsFromDto(dto),
    );
  }

  async getAllUser(userId: number) {
    return await this.repository.getAllByUserId(userId);
  }

  //update

  //utils
  private constructSearchOptionsFromDto(
    dto: GetAllOrdersDto,
  ): Prisma.OrderFindManyArgs {
    const searchOptions: Prisma.OrderFindManyArgs = {};
    const take = dto.limit || 12;
    searchOptions.take = take;
    const page = dto.page || 1;
    searchOptions.skip = page * take - take;
    searchOptions.orderBy = { createdAt: 'asc' };
    searchOptions.where = {
      userId: dto.userId || undefined,
      deliveryServiceId: dto.deliveryServiceId || undefined,
      status: dto.status || undefined,
    };
    searchOptions.include = {
      deliveryService: true,
      userAddress: true,
      user: {
        select: {
          id: true,
          name: true,
          surname: true,
          phone: true,
          email: true,
          vkLink: true,
          tgLink: true,
        },
      },
    };
    return searchOptions;
  }
}
