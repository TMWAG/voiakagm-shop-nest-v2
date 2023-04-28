import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
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
import { Role } from '@prisma/client';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { DeleteProductDto } from './dto/delete-product.dto';
import { GetAllProductsDto } from './dto/get-all-products.dto';
import { GetProductByIdDto } from './dto/get-product-by-id.dto';
import { CreateProductEntity } from './entities/create-product.entity';
import { GetProductEntity } from './entities/get-product.entity';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создание товара' })
  @ApiOkResponse({
    description: 'Успешное создание товара',
    type: CreateProductEntity,
  })
  @ApiBadRequestResponse({
    description:
      'Указаны не все параметры для создания товара или они неверного типа',
  })
  @ApiUnauthorizedResponse({
    description: 'Не указан токен авторизации',
  })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @Post('add')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  @ApiOperation({
    summary: 'Получение всех товаров с фильтрацией и пагинацией',
  })
  @ApiOkResponse({
    description: 'Успешное получение массива товаров',
    type: [GetProductEntity],
  })
  @ApiBadRequestResponse({
    description: 'Неверно указан параметр сортировки',
  })
  @Get('all')
  getAll(@Query() dto: GetAllProductsDto) {
    return this.productService.getAllProducts(dto);
  }

  @ApiOperation({ summary: 'Получение информации об одном товаре' })
  @ApiOkResponse({
    description: 'Успешное получение товара',
    type: GetProductEntity,
  })
  @ApiBadRequestResponse({
    description: 'Не указан Id товара',
  })
  @Get('id/:id')
  getOne(@Param() dto: GetProductByIdDto) {
    return this.productService.getProductById(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Изменение товара',
  })
  @ApiOkResponse({
    description: 'Успешное изменение товара',
    type: CreateProductEntity,
  })
  @ApiBadRequestResponse({
    description: 'Не указан id и/или параметры имеют неверный формат',
  })
  @ApiNotFoundResponse({
    description: 'Не найден производитель и/или категория',
  })
  @ApiUnauthorizedResponse({
    description: 'Нет токена авторизации',
  })
  @ApiForbiddenResponse({
    description: 'Роль не соответствует заданным',
  })
  @Patch()
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  updateProduct(@Body() dto: UpdateProductDto) {
    return this.productService.updateProductById(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удаление товара' })
  @ApiOkResponse({
    description: 'Успешное удаление товара',
    type: CreateProductEntity,
  })
  @ApiBadRequestResponse({
    description: 'Не указаны параметры или они неправильного типа',
  })
  @ApiUnauthorizedResponse({
    description: 'Не указан токен авторизации',
  })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @Delete('delete')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  delete(@Body() dto: DeleteProductDto) {
    return this.productService.deleteProduct(dto);
  }
}
