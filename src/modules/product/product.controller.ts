import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { GetAllProductsDto } from './dto/get-all-products.dto';
import { UpdateProductAmountDto } from './dto/update-product-amount.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { UpdateProductDescriptionDto } from './dto/update-product-description.dto';
import { UpdateProductDiscountDto } from './dto/update-product-discount.dto';
import { UpdateProductNameDto } from './dto/update-product-name.dto';
import { UpdateProductPriceDto } from './dto/update-product-price.dto';
import { UpdateProductVendorDto } from './dto/update-product-vendor.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('create')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  @Get('all')
  getAll(@Query() dto: GetAllProductsDto) {
    return this.productService.getAllProducts(dto);
  }

  @Patch('name')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  updateName(@Body() dto: UpdateProductNameDto) {
    return this.productService.updateProductName(dto);
  }

  @Patch('category')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  updateCategory(@Body() dto: UpdateProductCategoryDto) {
    return this.productService.updateProductCategory(dto);
  }

  @Patch('vendor')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  updateVendor(@Body() dto: UpdateProductVendorDto) {
    return this.productService.updateProductVendor(dto);
  }

  @Patch('description')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  updateDescription(@Body() dto: UpdateProductDescriptionDto) {
    return this.productService.updateProductDescription(dto);
  }

  @Patch('price')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  updatePrice(@Body() dto: UpdateProductPriceDto) {
    return this.productService.updateProductPrice(dto);
  }

  @Patch('discount')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  updateDiscount(@Body() dto: UpdateProductDiscountDto) {
    return this.productService.updateProductDiscount(dto);
  }

  @Patch('amount')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  updateAmount(@Body() dto: UpdateProductAmountDto) {
    return this.productService.updateProductAmountManually(dto);
  }
}
