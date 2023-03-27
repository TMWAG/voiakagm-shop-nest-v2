import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
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
import { UpdateProductAmountDto } from './dto/update-product-amount.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { UpdateProductDescriptionDto } from './dto/update-product-description.dto';
import { UpdateProductDiscountDto } from './dto/update-product-discount.dto';
import { UpdateProductNameDto } from './dto/update-product-name.dto';
import { UpdateProductPriceDto } from './dto/update-product-price.dto';
import { UpdateProductVendorDto } from './dto/update-product-vendor.dto';
import { CreateProductEntity } from './entities/create-product.entity';
import { GetProductEntity } from './entities/get-product.entity';
import { ProductService } from './product.service';

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

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменение названия товара' })
  @ApiOkResponse({
    description: 'Успешное изменение названия товара',
    type: CreateProductEntity,
  })
  @ApiBadRequestResponse({
    description: 'Не указаны параметры или они неправильного типа',
  })
  @ApiUnauthorizedResponse({
    description: 'Не указан токен авторизации',
  })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @Patch('name')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  updateName(@Body() dto: UpdateProductNameDto) {
    return this.productService.updateProductName(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменение категории товара' })
  @ApiOkResponse({
    description: 'Успешное изменение категории товара',
    type: CreateProductEntity,
  })
  @ApiBadRequestResponse({
    description: 'Не указаны параметры или они неправильного типа',
  })
  @ApiUnauthorizedResponse({
    description: 'Не указан токен авторизации',
  })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @Patch('category')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  updateCategory(@Body() dto: UpdateProductCategoryDto) {
    return this.productService.updateProductCategory(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменение производителя' })
  @ApiOkResponse({
    description: 'Успешное изменение производителя',
    type: CreateProductEntity,
  })
  @ApiBadRequestResponse({
    description: 'Не указаны параметры или они неправильного типа',
  })
  @ApiUnauthorizedResponse({
    description: 'Не указан токен авторизации',
  })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @Patch('vendor')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  updateVendor(@Body() dto: UpdateProductVendorDto) {
    return this.productService.updateProductVendor(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменение описания' })
  @ApiOkResponse({
    description: 'Успешное изменение описания',
    type: CreateProductEntity,
  })
  @ApiBadRequestResponse({
    description: 'Не указаны параметры или они неправильного типа',
  })
  @ApiUnauthorizedResponse({
    description: 'Не указан токен авторизации',
  })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @Patch('description')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  updateDescription(@Body() dto: UpdateProductDescriptionDto) {
    return this.productService.updateProductDescription(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменение цены' })
  @ApiOkResponse({
    description: 'Успешное изменение цены',
    type: CreateProductEntity,
  })
  @ApiBadRequestResponse({
    description: 'Не указаны параметры или они неправильного типа',
  })
  @ApiUnauthorizedResponse({
    description: 'Не указан токен авторизации',
  })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @Patch('price')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  updatePrice(@Body() dto: UpdateProductPriceDto) {
    return this.productService.updateProductPrice(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменение скидки' })
  @ApiOkResponse({
    description: 'Успешное изменение скидки',
    type: CreateProductEntity,
  })
  @ApiBadRequestResponse({
    description: 'Не указаны параметры или они неправильного типа',
  })
  @ApiUnauthorizedResponse({
    description: 'Не указан токен авторизации',
  })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @Patch('discount')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  updateDiscount(@Body() dto: UpdateProductDiscountDto) {
    return this.productService.updateProductDiscount(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменение кол-ва товаров' })
  @ApiOkResponse({
    description: 'Успешное изменение кол-ва',
    type: CreateProductEntity,
  })
  @ApiBadRequestResponse({
    description: 'Не указаны параметры или они неправильного типа',
  })
  @ApiUnauthorizedResponse({
    description: 'Не указан токен авторизации',
  })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @Patch('amount')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  updateAmount(@Body() dto: UpdateProductAmountDto) {
    return this.productService.updateProductAmountManually(dto);
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
