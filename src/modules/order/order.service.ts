import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { OrderStatus, Prisma } from '@prisma/client';
import { UsersAddressesService } from '../users-addresses/users-addresses.service';
import { GetAllOrdersDto } from './dto/get-all-orders.dto';
import { GetOneOrderDto } from './dto/get-one-order.dto';
import { UpdateOrderDeliveryServiceDto } from './dto/update-order-delivery-service.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { OrderRepository } from './order.repository';
import { TinkoffAcqService } from '../tinkoff-acq/tinkoff-acq.service';
import { ApproveOrderDto } from './dto/approve-order.dto';
import { CheckOrderPaymentDto } from './dto/check-order-payment.dto';
import { PurchasedProductsService } from '../purchased-products/purchased-products.service';
import { SetOrderStatusSentForDeliveryDto } from './dto/set-order-status-sent-for-delivery.dto';
import { ConfirmOrderReceiptDto } from './dto/confirm-order-receipt.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly usersAddressesService: UsersAddressesService,
    private readonly tinkoffAcqService: TinkoffAcqService,
    private readonly purchasedProductsService: PurchasedProductsService,
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
    const result = await this.tinkoffAcqService.checkOrder(order.id);
    if (result.Payments.some((payment) => payment.Status === 'CONFIRMED')) {
      return this.repository.setStatusToPaid(dto.id);
    }
    return order;
  }

  async setOrderStatusToSentForDelivery(dto: SetOrderStatusSentForDeliveryDto) {
    const order = await this.getOneOrThrowError(dto.id);
    if (order.status !== OrderStatus.PAID)
      throw new BadRequestException(
        'Заказ ещё не оплачен или уже передан в доставку',
      );
    return this.repository.setStatusToSentForDelivery(dto.id, dto.trackNo);
  }

  async confirmReceipt(userId: number, dto: ConfirmOrderReceiptDto) {
    const order = await this.getOneOrThrowError(dto.id);
    if (order.status !== OrderStatus.SENT_FOR_DELIVERY)
      throw new BadRequestException('Данный заказ ещё не отправлен');
    if (order.userId !== userId)
      throw new BadRequestException('Данный заказ не числится за Вами');
    order.orderedProducts.map((product) =>
      this.purchasedProductsService.add(order.userId, product.product.id),
    );
    return this.repository.setStatusToDelivered(dto.id);
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
