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
import { Role } from '@prisma/client';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateProductCharacteristicDto } from './dto/create-product-characteristic.dto';
import { DeleteProductCharacteristicDto } from './dto/delete-product-characteristic.dto';
import { GetAllProductCharacteristicsByParameterDto } from './dto/get-all-product-characteristics-by-parameter-id.dto';
import { GetAllProductCharacteristicsByProductDto } from './dto/get-all-product-characteristics-by-product-id.dto';
import { UpdateProductCharacteristicDto } from './dto/update-product-characteristic.dto';
import { ProductCharacteristicService } from './product-characteristic.service';

@Controller('product_characteristic')
export class ProductCharacteristicController {
  constructor(
    private readonly productParameterService: ProductCharacteristicService,
  ) {}

  @Post('create')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateProductCharacteristicDto) {
    return this.productParameterService.createProductCharacteristic(dto);
  }

  @Get('product')
  getAllByProductId(@Query() dto: GetAllProductCharacteristicsByProductDto) {
    return this.productParameterService.getAllProductCharacteristicsByProductId(
      dto,
    );
  }

  @Get('parameter')
  getAllByParameterId(
    @Query() dto: GetAllProductCharacteristicsByParameterDto,
  ) {
    return this.productParameterService.getAllProductCharacteristicByParameterId(
      dto,
    );
  }

  @Patch('update')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  update(@Body() dto: UpdateProductCharacteristicDto) {
    return this.productParameterService.updateProductCharacteristicById(dto);
  }

  @Delete('delete')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  delete(@Body() dto: DeleteProductCharacteristicDto) {
    return this.productParameterService.deleteProductCharacteristicById(dto);
  }
}
