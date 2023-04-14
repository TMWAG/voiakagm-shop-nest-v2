import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UsersAddressesService } from '../users-addresses/users-addresses.service';
import { GetAllOrdersDto } from './dto/get-all-orders.dto';
import { GetOneOrderDto } from './dto/get-one-order.dto';
import { UpdateOrderDeliveryServiceDto } from './dto/update-order-delivery-service.dto';
import { UpdateOrderTrackNoDto } from './dto/update-order-track-no.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { OrderRepository } from './order.repository';
import { TinkoffAcqService } from '../tinkoff-acq/tinkoff-acq.service';
import { ApproveOrderDto } from './dto/approve-order.dto';
import { CheckOrderPaymentDto } from './dto/check-order-payment.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly usersAddressesService: UsersAddressesService,
    private readonly tinkoffAcqService: TinkoffAcqService,
  ) {}

  //create
  async createOrGetCurrent(userId: number) {
    const order = await this.repository.getCurrentByUserId(userId);
    if (!order) {
      return await this.repository.create(userId);
    }
    return order;
  }

  //get
  async getOne(dto: GetOneOrderDto) {
    return await this.getOneOrThrowError(dto.id);
  }

  async getOneOrThrowError(id: number) {
    const order = await this.repository.getById(id);
    if (!order) throw new NotFoundException(`Заказ с id ${id} не найден`);
    return order;
  }

  async getAll(dto: GetAllOrdersDto) {
    return await this.repository.getAll(
      this.constructSearchOptionsFromDto(dto),
    );
  }

  async getAllUser(userId: number) {
    return await this.repository.getAllByUserId(userId);
  }

  //update
  async setUserAddress(userId: number, dto: UpdateUserAddressDto) {
    await this.usersAddressesService.checkUserOwnershipOnAddressOrThrowError(
      userId,
      dto.userAddressId,
    );
    const order = await this.createOrGetCurrent(userId);
    return await this.repository.setUserAddress(order.id, dto.userAddressId);
  }

  async setDeliveryService(dto: UpdateOrderDeliveryServiceDto) {
    await this.getOneOrThrowError(dto.id);
    return await this.repository.setDeliveryService(
      dto.id,
      dto.deliveryServiceId,
    );
  }

  async setTrackNo(dto: UpdateOrderTrackNoDto) {
    return await this.repository.setTrackNo(dto.id, dto.trackNo);
  }

  async approve(dto: ApproveOrderDto) {
    const order = await this.getOneOrThrowError(dto.id);
    const response = await this.tinkoffAcqService.init(order);
    if (!response.Success) {
      throw new InternalServerErrorException(response.Error);
    }
    this.repository.setStatusToAwaitingPayment(dto.id);
    return {
      link: response.PaymentURL,
    };
  }

  async checkPayment(dto: CheckOrderPaymentDto) {
    const order = await this.getOneOrThrowError(dto.id);
    return await this.tinkoffAcqService.checkOrder(order.id);
  }

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
