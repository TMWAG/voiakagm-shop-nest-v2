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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OrderedProductEntity } from './entities/ordered-product.entity';
import { UpdateOrderedProductEntity } from './entities/update-ordered-product.entity';
import { DeleteOrderedProductEntity } from './entities/delete-ordered-product.entity';

@ApiTags('Cart')
@Controller('cart')
export class OrderedProductsController {
  constructor(
    private readonly orderedProductsService: OrderedProductsService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Добавление товара в корзину' })
  @ApiOkResponse({
    description: 'Успешное добавление товара в корзину',
    type: OrderedProductEntity,
  })
  @ApiBadRequestResponse({
    description:
      'Id товара не указан или имеет некорректный формат, или не указано кол-во товара',
  })
  @ApiUnauthorizedResponse({
    description: 'Нет токена авторизации',
  })
  @Post('')
  @UseGuards(JwtAuthGuard)
  add(@Request() { user }, @Body() dto: CreateOrderedProductDto) {
    return this.orderedProductsService.create(user.id, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменение количества товара' })
  @ApiOkResponse({
    description: 'Успешное изменение кол-ва товаров',
    type: UpdateOrderedProductEntity,
  })
  @ApiBadRequestResponse({
    description: 'Попытка изменить кол-во товара не в текущем заказе',
  })
  @ApiNotFoundResponse({
    description: 'Заказанный товар не найден',
  })
  @ApiUnauthorizedResponse({
    description: 'Нет токена авторизации',
  })
  @Patch('')
  @UseGuards(JwtAuthGuard)
  changeAmount(
    @Request() { user },
    @Body() dto: UpdateOrderedProductAmountDto,
  ) {
    return this.orderedProductsService.updateAmount(user.id, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удаление товара из корзины' })
  @ApiOkResponse({
    description: 'Успешное удаление товара из корзины',
    type: DeleteOrderedProductEntity,
  })
  @ApiBadRequestResponse({
    description: 'Попытка удалить товар не в текущем заказе',
  })
  @ApiNotFoundResponse({
    description: 'Заказанный товар не найден',
  })
  @ApiUnauthorizedResponse({
    description: 'Нет токена авторизации',
  })
  @Delete('')
  @UseGuards(JwtAuthGuard)
  delete(@Request() { user }, @Body() dto: DeleteOrderedProductDto) {
    return this.orderedProductsService.delete(user.id, dto);
  }
}
