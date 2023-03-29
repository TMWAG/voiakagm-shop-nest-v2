import { Injectable, NotFoundException } from '@nestjs/common';
import { httpExceptionMessages } from 'src/errors/http-exceptions.errors';
import { ParameterService } from '../parameter/parameter.service';
import { ProductService } from '../product/product.service';
import { CreateProductCharacteristicDto } from './dto/create-product-characteristic.dto';
import { DeleteProductCharacteristicDto } from './dto/delete-product-characteristic.dto';
import { GetAllProductCharacteristicsByParameterDto } from './dto/get-all-product-characteristics-by-parameter-id.dto';
import { GetAllProductCharacteristicsByProductDto } from './dto/get-all-product-characteristics-by-product-id.dto';
import { UpdateProductCharacteristicDto } from './dto/update-product-characteristic.dto';
import { ProductCharacteristicRepository } from './product-characteristic.repository';

@Injectable()
export class ProductCharacteristicService {
  constructor(
    private readonly repository: ProductCharacteristicRepository,
    private readonly productService: ProductService,
    private readonly parameterService: ParameterService,
  ) {}

  //crate
  async createProductCharacteristic(dto: CreateProductCharacteristicDto) {
    await this.parameterService.getParameterByIdOrThrowError(dto.parameterId);
    await this.productService.getProductByIdOrThrowError(dto.productId);
    return await this.repository.createProductCharacteristic(
      dto.parameterId,
      dto.productId,
      dto.value,
    );
  }

  //get
  async getProductCharacteristicByIdOrThrowError(id: number) {
    const productCharacteristic =
      await this.repository.getProductCharacteristicById(id);
    if (!productCharacteristic)
      throw new NotFoundException(
        httpExceptionMessages.notFound.productCharacteristic,
      );
    return productCharacteristic;
  }

  async getAllProductCharacteristicsByProductId(
    dto: GetAllProductCharacteristicsByProductDto,
  ) {
    await this.productService.getProductByIdOrThrowError(Number(dto.productId));
    return await this.repository.getAllProductCharacteristicsByProductId(
      Number(dto.productId),
    );
  }

  async getAllProductCharacteristicByParameterId(
    dto: GetAllProductCharacteristicsByParameterDto,
  ) {
    await this.parameterService.getParameterByIdOrThrowError(
      Number(dto.parameterId),
    );
    return await this.repository.getAllProductCharacteristicsByParameterId(
      Number(dto.parameterId),
    );
  }

  //update
  async updateProductCharacteristicById(dto: UpdateProductCharacteristicDto) {
    await this.getProductCharacteristicByIdOrThrowError(Number(dto.id));
    await this.parameterService.getParameterByIdOrThrowError(dto.parameterId);
    return await this.repository.updateProductCharacteristicById(
      Number(dto.id),
      Number(dto.parameterId),
      dto.value,
    );
  }

  //delete
  async deleteProductCharacteristicById(dto: DeleteProductCharacteristicDto) {
    await this.getProductCharacteristicByIdOrThrowError(dto.id);
    return await this.repository.deleteProductCharacteristicById(dto.id);
  }
}
