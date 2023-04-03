import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GetAllOrdersDto } from './dto/get-all-orders.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('all')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  getAll(@Query() dto: GetAllOrdersDto) {
    return this.orderService.getAll(dto);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  getAllUser(@Request() { user }) {
    return this.orderService.getAllUser(user.id);
  }
}
