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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConfirmOrderReceiptDto } from './dto/confirm-order-receipt.dto';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Получение всех заказов с пагинацией и фильтрацией',
  })
  @Get('all')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  getAll(@Query() dto: GetAllOrdersDto) {
    return this.orderService.getAll(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'получение информации о заказе по id для админа или супервайзера',
  })
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
  @Get('my')
  @UseGuards(JwtAuthGuard)
  getAllUser(@Request() { user }) {
    return this.orderService.getAllUser(user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Получение текущего заказа пользователя',
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
  @Get('check_payment/:id')
  @UseGuards(JwtAuthGuard)
  checkOrderPayment(@Param() dto: CheckOrderPaymentDto) {
    return this.orderService.checkPayment(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Указание адреса доставки',
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
  @Patch('approve')
  @UseGuards(JwtAuthGuard)
  approve(@Body() dto: ApproveOrderDto) {
    return this.orderService.approve(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Подтверждение получения заказа',
  })
  @Patch('confirm_receipt')
  @UseGuards(JwtAuthGuard)
  confirmReceipt(@Request() { user }, @Body() dto: ConfirmOrderReceiptDto) {
    return this.orderService.confirmReceipt(user.id, dto);
  }
}
