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
import { UpdateOrderTrackNoDto } from './dto/update-order-track-no.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { OrderService } from './order.service';
import { ApproveOrderDto } from './dto/approve-order.dto';
import { CheckOrderPaymentDto } from './dto/check-order-payment.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('all')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  getAll(@Query() dto: GetAllOrdersDto) {
    return this.orderService.getAll(dto);
  }

  @Get('user/:id')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  getOne(@Param() dto: GetOneOrderDto) {
    return this.orderService.getOne(dto);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  getAllUser(@Request() { user }) {
    return this.orderService.getAllUser(user.id);
  }

  @Get('current')
  @UseGuards(JwtAuthGuard)
  getCurrent(@Request() { user }) {
    return this.orderService.createOrGetCurrent(user.id);
  }

  @Get('check_payment/:id')
  @UseGuards(JwtAuthGuard)
  checkOrderPayment(@Param() dto: CheckOrderPaymentDto) {
    return this.orderService.checkPayment(dto);
  }

  @Patch('set_address')
  @UseGuards(JwtAuthGuard)
  setAddress(@Request() { user }, @Body() dto: UpdateUserAddressDto) {
    return this.orderService.setUserAddress(user.id, dto);
  }

  @Patch('delivery_service')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  setDeliveryService(@Body() dto: UpdateOrderDeliveryServiceDto) {
    return this.orderService.setDeliveryService(dto);
  }

  @Patch('set_track_no')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  setTrackNo(@Body() dto: UpdateOrderTrackNoDto) {
    return this.orderService.setTrackNo(dto);
  }

  @Patch('approve')
  @UseGuards(JwtAuthGuard)
  approve(@Body() dto: ApproveOrderDto) {
    return this.orderService.approve(dto);
  }
}
