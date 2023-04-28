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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateProductCharacteristicDto } from './dto/create-product-characteristic.dto';
import { DeleteProductCharacteristicDto } from './dto/delete-product-characteristic.dto';
import { GetAllProductCharacteristicsByParameterDto } from './dto/get-all-product-characteristics-by-parameter-id.dto';
import { GetAllProductCharacteristicsByProductDto } from './dto/get-all-product-characteristics-by-product-id.dto';
import { UpdateProductCharacteristicDto } from './dto/update-product-characteristic.dto';
import { ProductCharacteristicEntity } from './entities/product-characteristic.entity';
import { ProductCharacteristicService } from './product-characteristic.service';

@ApiTags('Product Characteristic')
@Controller('product_characteristic')
export class ProductCharacteristicController {
  constructor(
    private readonly productParameterService: ProductCharacteristicService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Добавление характеристики товара' })
  @ApiOkResponse({
    description: 'Характеристика успешно создана',
    type: ProductCharacteristicEntity,
  })
  @ApiBadRequestResponse({
    description: 'Не указаны Id товара, параметра или значение характеристики',
  })
  @ApiNotFoundResponse({ description: 'Не найден параметр или товар' })
  @ApiUnauthorizedResponse({ description: 'Нет токена авторизации' })
  @Post('create')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateProductCharacteristicDto) {
    return this.productParameterService.createProductCharacteristic(dto);
  }

  @ApiOperation({ summary: 'Получение всех характеристик товара' })
  @ApiOkResponse({
    description: 'Массив характеристик успешно получен',
    type: [ProductCharacteristicEntity],
  })
  @ApiBadRequestResponse({ description: 'Не указан Id товара' })
  @ApiNotFoundResponse({ description: 'Не найден товар' })
  @Get('product')
  getAllByProductId(@Query() dto: GetAllProductCharacteristicsByProductDto) {
    return this.productParameterService.getAllProductCharacteristicsByProductId(
      dto,
    );
  }

  @ApiOperation({ summary: 'Получение всех характеристик параметра' })
  @ApiOkResponse({
    description: 'Массив характеристик успешно получен',
    type: [ProductCharacteristicEntity],
  })
  @ApiBadRequestResponse({ description: 'Не указан Id параметра' })
  @ApiNotFoundResponse({ description: 'Не найден параметр' })
  @Get('parameter')
  getAllByParameterId(
    @Query() dto: GetAllProductCharacteristicsByParameterDto,
  ) {
    return this.productParameterService.getAllProductCharacteristicByParameterId(
      dto,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Изменение параметра и/или значения характеристики',
  })
  @ApiOkResponse({
    description: 'Характеристика успешно изменена',
    type: ProductCharacteristicEntity,
  })
  @ApiBadRequestResponse({
    description:
      'Не указан Id характеристики или Id параметра или его значение',
  })
  @ApiNotFoundResponse({
    description: 'Не найдена характеристика или параметр',
  })
  @ApiUnauthorizedResponse({ description: 'Нет токена авторизации' })
  @Patch()
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  update(@Body() dto: UpdateProductCharacteristicDto) {
    return this.productParameterService.updateProductCharacteristicById(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удаление характеристики товара' })
  @ApiOkResponse({
    description: 'Характеристика успешно удалена',
    type: ProductCharacteristicEntity,
  })
  @ApiBadRequestResponse({
    description: 'Не указан Id характеристики',
  })
  @ApiNotFoundResponse({ description: 'Не найдена характеристика' })
  @ApiUnauthorizedResponse({ description: 'Нет токена авторизации' })
  @Delete('delete')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  delete(@Body() dto: DeleteProductCharacteristicDto) {
    return this.productParameterService.deleteProductCharacteristicById(dto);
  }
}
