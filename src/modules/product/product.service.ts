import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { httpExceptionMessages } from 'src/errors/http-exceptions.errors';
import { ProductPictureService } from '../product-picture/product-picture.service';
import { CreateProductDto } from './dto/create-product.dto';
import { DeleteProductDto } from './dto/delete-product.dto';
import { GetAllProductsDto } from './dto/get-all-products.dto';
import { GetProductByIdDto } from './dto/get-product-by-id.dto';
import { ProductRepository } from './product.repository';
import { CategoryService } from '../category/category.service';
import { VendorService } from '../vendor/vendor.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productPictureService: ProductPictureService,
    private readonly categoryService: CategoryService,
    private readonly vendorService: VendorService,
  ) {}

  //create
  async createProduct(dto: CreateProductDto) {
    await this.categoryService.getCategoryByIdOrThrowError(dto.categoryId);
    await this.vendorService.getVendorByIdOrThrowError(dto.vendorId);
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
    return await this.getProductByIdOrThrowError(dto.id);
  }

  async getProductByIdOrThrowError(id: number) {
    const product = await this.productRepository.getProductById(id);
    if (!product)
      throw new NotFoundException(httpExceptionMessages.notFound.product(id));
    return product;
  }

  //update
  async updateProductById(dto: UpdateProductDto) {
    if (dto.categoryId)
      await this.categoryService.getCategoryByIdOrThrowError(dto.categoryId);
    if (dto.vendorId)
      await this.vendorService.getVendorByIdOrThrowError(dto.vendorId);
    return await this.productRepository.updateProductById(
      dto.id,
      dto.name,
      dto.vendorId,
      dto.categoryId,
      dto.description,
      dto.price,
      dto.discount,
      dto.amount,
    );
  }

  async decreaseAmount(productId: number, amount: number) {
    const product = await this.getProductByIdOrThrowError(productId);
    const newAmount = product.amount ? product.amount - amount : undefined;
    this.productRepository.updateProductAmountById(productId, newAmount);
  }

  async increaseSold(productId: number, sold: number) {
    const product = await this.getProductByIdOrThrowError(productId);
    const newSoldCount = product.sold + sold;
    this.productRepository.updateProductSoldById(productId, newSoldCount);
  }

  async deleteProduct(dto: DeleteProductDto) {
    await this.getProductByIdOrThrowError(dto.id);
    await this.productPictureService.deleteAllProductPicturesByProductId(
      dto.id,
    );
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
