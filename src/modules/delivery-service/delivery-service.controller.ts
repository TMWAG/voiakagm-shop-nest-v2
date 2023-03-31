import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
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
import { DeliveryServiceService } from './delivery-service.service';
import { CreateDeliveryServiceDto } from './dto/create-delivery-service.dto';
import { DeleteDeliveryServiceDto } from './dto/delete-delevery-service.dto';
import { UpdateDeliveryServiceDto } from './dto/update-delivery-service.dto';
import { DeliveryServiceEntity } from './entities/delivery-service.entity';

@ApiTags('Delivery Service')
@Controller('delivery_service')
export class DeliveryServiceController {
  constructor(
    private readonly deliveryServiceService: DeliveryServiceService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Добавление службы доставки' })
  @ApiOkResponse({
    description: 'Успешное создание службы доставки',
    type: DeliveryServiceEntity,
  })
  @ApiBadRequestResponse({ description: 'Не указано название службы доставки' })
  @ApiUnauthorizedResponse({ description: 'Нет токена авторизации' })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @Post('')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateDeliveryServiceDto) {
    return this.deliveryServiceService.create(dto);
  }

  @ApiOperation({ summary: 'Получение всех служб доставки' })
  @ApiOkResponse({
    description: 'Успешное получение всех служб доставки',
    type: [DeliveryServiceEntity],
  })
  @Get('')
  getAll() {
    return this.deliveryServiceService.getAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменение названия службы доставки' })
  @ApiOkResponse({
    description: 'Название службы доставки успешно изменено',
    type: DeliveryServiceEntity,
  })
  @ApiBadRequestResponse({ description: 'Не указан Id или новое название' })
  @ApiNotFoundResponse({ description: 'Не найдена службы доставки' })
  @ApiUnauthorizedResponse({ description: 'Нет токена авторизации' })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @Patch('')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  update(@Body() dto: UpdateDeliveryServiceDto) {
    return this.deliveryServiceService.update(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удаление службы доставки' })
  @ApiOkResponse({
    description: 'Успешное удаление службы доставки',
    type: DeliveryServiceEntity,
  })
  @ApiBadRequestResponse({ description: 'Не указан Id' })
  @ApiNotFoundResponse({ description: 'Не найдена службы доставки' })
  @ApiUnauthorizedResponse({ description: 'Нет токена авторизации' })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @Delete('')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  delete(@Body() dto: DeleteDeliveryServiceDto) {
    return this.deliveryServiceService.delete(dto);
  }
}
