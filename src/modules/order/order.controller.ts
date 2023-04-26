import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GetAllOrdersDto } from './dto/get-all-orders.dto';
import { GetOneOrderDto } from './dto/get-one-order.dto';
import { UpdateOrderDeliveryServiceDto } from './dto/update-order-delivery-service.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { OrderService } from './order.service';
import { ApproveOrderDto } from './dto/approve-order.dto';
import { CheckOrderPaymentDto } from './dto/check-order-payment.dto';
import { SetOrderStatusSentForDeliveryDto } from './dto/set-order-status-sent-for-delivery.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ConfirmOrderReceiptDto } from './dto/confirm-order-receipt.dto';
import { OrderEntity } from './entities/order.entity';
import { ShortOrderEntity } from './entities/short-order.entity';
import { OrderPaymentLinkEntity } from './entities/order-payment-link.entity';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Получение всех заказов с пагинацией и фильтрацией',
  })
  @ApiOkResponse({
    description: 'Заказы успешно получены',
    type: [OrderEntity],
  })
  @ApiBadRequestResponse({
    description: 'Неверно указаны параметры сортировки или фильтрации',
  })
  @ApiUnauthorizedResponse({
    description: 'Нет токена авторизации',
  })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @Get('all')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  getAll(@Query() dto: GetAllOrdersDto) {
    return this.orderService.getAll(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Получение информации о заказе по id для админа или супервайзера',
  })
  @ApiOkResponse({
    description: 'Информация о заказе успешно получена',
    type: OrderEntity,
  })
  @ApiBadRequestResponse({
    description: 'Id заказа не указан или имеет неверный тип/формат',
  })
  @ApiNotFoundResponse({
    description: 'Заказ не найден',
  })
  @ApiUnauthorizedResponse({
    description: 'Нет токена авторизации',
  })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @Get('id/:id')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  getOne(@Param() dto: GetOneOrderDto) {
    return this.orderService.getOne(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Получение всех заказов пользователя',
  })
  @ApiOkResponse({
    description: 'Успешное получение заказов пользователя',
    type: OrderEntity,
  })
  @ApiUnauthorizedResponse({
    description: 'Нет токена авторизации',
  })
  @Get('my')
  @UseGuards(JwtAuthGuard)
  getAllUser(@Request() { user }) {
    return this.orderService.getAllUser(user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Получение текущего заказа пользователя или создание нового',
  })
  @ApiOkResponse({
    description: 'Успешное получение текущего заказа пользователя',
    type: OrderEntity,
  })
  @ApiUnauthorizedResponse({
    description: 'Нет токена авторизации',
  })
  @Get('current')
  @UseGuards(JwtAuthGuard)
  getCurrent(@Request() { user }) {
    return this.orderService.createOrGetCurrent(user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Проверка оплаты товара',
  })
  @ApiOkResponse({
    description: 'Получение информации об оплате заказа',
    type: ShortOrderEntity,
  })
  @ApiBadRequestResponse({
    description: 'Id заказа не указан или имеет неверный формат',
  })
  @ApiNotFoundResponse({
    description: 'Заказ не найден',
  })
  @ApiUnauthorizedResponse({
    description: 'Нет токена авторизации',
  })
  @Get('check_payment/:id')
  @UseGuards(JwtAuthGuard)
  checkOrderPayment(@Param() dto: CheckOrderPaymentDto) {
    return this.orderService.checkPayment(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Указание адреса доставки',
  })
  @ApiOkResponse({
    description: 'Успешное изменение адреса доставки',
    type: ShortOrderEntity,
  })
  @ApiBadRequestResponse({
    description: 'Id заказа или адреса не указан или имеет неверный формат',
  })
  @ApiNotFoundResponse({
    description: 'Заказ не найден',
  })
  @ApiUnauthorizedResponse({
    description: 'Нет токена авторизации',
  })
  @Patch('set_address')
  @UseGuards(JwtAuthGuard)
  setAddress(@Request() { user }, @Body() dto: UpdateUserAddressDto) {
    return this.orderService.setUserAddress(user.id, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Указание службы доставки',
  })
  @ApiOkResponse({
    description: 'Успешное изменение службы доставки',
    type: ShortOrderEntity,
  })
  @ApiBadRequestResponse({
    description:
      'Id заказа или службы доставки не указан или имеет неверный формат',
  })
  @ApiNotFoundResponse({
    description: 'Заказ не найден',
  })
  @ApiUnauthorizedResponse({
    description: 'Нет токена авторизации',
  })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @Patch('set_delivery_service')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  setDeliveryService(@Body() dto: UpdateOrderDeliveryServiceDto) {
    return this.orderService.setDeliveryService(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Изменение статуса заказа на "Передан в доставку"',
  })
  @ApiOkResponse({
    description: 'Заказ успешно передан в доставку',
    type: ShortOrderEntity,
  })
  @ApiBadRequestResponse({
    description:
      'Id заказа или трек-номер не указан или имеют неверный формат или заказ ещё не оплачен',
  })
  @ApiNotFoundResponse({
    description: 'Заказ не найден',
  })
  @ApiUnauthorizedResponse({
    description: 'Нет токена авторизации',
  })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @Patch('sent_for_delivery')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  setTrackNo(@Body() dto: SetOrderStatusSentForDeliveryDto) {
    return this.orderService.setOrderStatusToSentForDelivery(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Подтверждение заказа, переход к оплате',
  })
  @ApiOkResponse({
    description: 'Успешное подтверждение заказа и получение ссылки для оплаты',
    type: OrderPaymentLinkEntity,
  })
  @ApiBadRequestResponse({
    description: 'Id заказа не указан или имеет неверный формат',
  })
  @ApiNotFoundResponse({
    description: 'Заказ не найден',
  })
  @ApiUnauthorizedResponse({
    description: 'Нет токена авторизации',
  })
  @Patch('approve')
  @UseGuards(JwtAuthGuard)
  approve(@Body() dto: ApproveOrderDto) {
    return this.orderService.approve(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Подтверждение получения заказа',
  })
  @ApiOkResponse({
    description: 'Успешное подтверждение получения заказа',
    type: ShortOrderEntity,
  })
  @ApiBadRequestResponse({
    description:
      'Id заказа не указан или имеет неверный формат, или заказ ещё не передан в доставку',
  })
  @ApiNotFoundResponse({
    description: 'Заказ не найден',
  })
  @ApiUnauthorizedResponse({
    description: 'Нет токена авторизации',
  })
  @Patch('confirm_receipt')
  @UseGuards(JwtAuthGuard)
  confirmReceipt(@Request() { user }, @Body() dto: ConfirmOrderReceiptDto) {
    return this.orderService.confirmReceipt(user.id, dto);
  }
}
