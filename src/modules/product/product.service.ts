import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { DeleteProductDto } from './dto/delete-product.dto';
import { GetAllProductsDto } from './dto/get-all-products.dto';
import { GetProductByIdDto } from './dto/get-product-by-id.dto';
import { UpdateProductAmountDto } from './dto/update-product-amount.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { UpdateProductDescriptionDto } from './dto/update-product-description.dto';
import { UpdateProductDiscountDto } from './dto/update-product-discount.dto';
import { UpdateProductNameDto } from './dto/update-product-name.dto';
import { UpdateProductPriceDto } from './dto/update-product-price.dto';
import { UpdateProductVendorDto } from './dto/update-product-vendor.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  //create
  async createProduct(dto: CreateProductDto) {
    return await this.productRepository.createProduct(
      dto.name,
      dto.vendorId,
      dto.categoryId,
      dto.price,
      dto.description,
      dto.used,
      dto.amount,
    );
  }

  //get
  async getAllProducts(dto: GetAllProductsDto) {
    return await this.productRepository.getAllProducts(
      this.constructSearchOptionsFromDto(dto),
    );
  }

  async getProductById(dto: GetProductByIdDto) {
    return await this.productRepository.getProductById(Number(dto.id));
  }

  //update
  async updateProductName(dto: UpdateProductNameDto) {
    return await this.productRepository.updateProductNameById(dto.id, dto.name);
  }

  async updateProductCategory(dto: UpdateProductCategoryDto) {
    return await this.productRepository.updateProductCategoryById(
      dto.id,
      dto.categoryId,
    );
  }

  async updateProductVendor(dto: UpdateProductVendorDto) {
    return await this.productRepository.updateProductVendorById(
      dto.id,
      dto.vendorId,
    );
  }

  async updateProductDescription(dto: UpdateProductDescriptionDto) {
    return await this.productRepository.updateProductDescriptionById(
      dto.id,
      dto.description,
    );
  }

  async updateProductPrice(dto: UpdateProductPriceDto) {
    return this.productRepository.updateProductPriceById(dto.id, dto.price);
  }

  async updateProductDiscount(dto: UpdateProductDiscountDto) {
    return await this.productRepository.updateProductDiscountById(
      dto.id,
      dto.discount,
    );
  }

  async updateProductAmountManually(dto: UpdateProductAmountDto) {
    return await this.productRepository.updateProductAmountById(
      dto.id,
      dto.amount,
    );
  }

  async deleteProduct(dto: DeleteProductDto) {
    return await this.productRepository.deleteProductById(dto.id);
  }

  //utils
  private constructSearchOptionsFromDto(
    dto: GetAllProductsDto,
  ): Prisma.ProductFindManyArgs {
    const searchOptions: Prisma.ProductFindManyArgs = {};
    const take = dto.limit || 12;
    searchOptions.take = Number(take);
    const page = dto.page || 1;
    searchOptions.skip = page * take - take;
    searchOptions.orderBy = { price: 'asc' };
    if (dto.sort) {
      const sort: string[] = dto.sort.split('-');
      if (sort[0] === 'price' && sort[1] === 'desc')
        searchOptions.orderBy.price = 'desc';
      if (sort[0] === 'sold') {
        searchOptions.orderBy = { sold: 'asc' };
        if (sort[1] === 'desc') searchOptions.orderBy.sold = 'desc';
      }
    }
    const whereOptions: Prisma.ProductWhereInput = {
      used: undefined,
      discount: undefined,
    };
    if (dto.vendorId) whereOptions.vendorId = Number(dto.vendorId);
    if (dto.categoryId) whereOptions.categoryId = Number(dto.categoryId);
    if (dto.used) whereOptions.used = Boolean(dto.used);
    if (dto.discounted) whereOptions.discount = { gte: 1 };
    if (dto.maxPrice) whereOptions.price = { lte: Number(dto.maxPrice) };
    if (dto.minPrice) {
      if (dto.maxPrice)
        whereOptions.price = {
          gte: Number(dto.minPrice),
          lte: Number(dto.maxPrice),
        };
      else whereOptions.price = { gte: Number(dto.minPrice) };
    }
    searchOptions.where = whereOptions;
    searchOptions.include = {
      category: { select: { name: true } },
      vendor: { select: { name: true } },
      pictures: { select: { filename: true }, take: 1 },
    };
    return searchOptions;
  }
}
