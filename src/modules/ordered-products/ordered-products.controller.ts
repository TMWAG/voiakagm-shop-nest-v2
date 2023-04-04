import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOrderedProductDto } from './dto/create-ordered-product.dto';
import { DeleteOrderedProductDto } from './dto/delete-ordered-product.dto';
import { UpdateOrderedProductAmountDto } from './dto/update-ordered-product-amount.dto';
import { OrderedProductsService } from './ordered-products.service';

@Controller('cart')
export class OrderedProductsController {
  constructor(
    private readonly orderedProductsService: OrderedProductsService,
  ) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  add(@Request() { user }, @Body() dto: CreateOrderedProductDto) {
    return this.orderedProductsService.create(user.id, dto);
  }

  @Patch('')
  @UseGuards(JwtAuthGuard)
  changeAmount(@Body() dto: UpdateOrderedProductAmountDto) {
    return this.orderedProductsService.updateAmount(dto);
  }

  @Delete('')
  @UseGuards(JwtAuthGuard)
  delete(@Body() dto: DeleteOrderedProductDto) {
    return this.orderedProductsService.delete(dto);
  }
}
