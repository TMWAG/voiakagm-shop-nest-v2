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
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { DeleteVendorDto } from './dto/delete-vendor.dto';
import { UpdateVendorNameDto } from './dto/update-vendor-name.dto';
import { VendorEntity } from './entities/vendor.entity';
import { VendorService } from './vendor.service';

@ApiTags('Vendor')
@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Добавление производителя' })
  @ApiOkResponse({
    description: 'Новый производитель успешно создан',
    type: VendorEntity,
  })
  @ApiBadRequestResponse({
    description: 'Не предоставлено имя нового производителя',
  })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @ApiForbiddenResponse({ description: 'Нет токена авторизации' })
  @Post('add')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  crateVendor(@Body() dto: CreateVendorDto) {
    return this.vendorService.createVendor(dto);
  }

  @ApiOperation({ summary: 'Получение всех производителей' })
  @ApiOkResponse({
    description: 'Успешно получен массив производителей',
    type: [VendorEntity],
  })
  @Get('all')
  getAllVendors() {
    return this.vendorService.getAllVendors();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменение названия производителя' })
  @ApiOkResponse({
    description: 'Название успешно изменено',
    type: VendorEntity,
  })
  @ApiBadRequestResponse({
    description: 'Не предоставлено новое название производителя',
  })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @ApiForbiddenResponse({ description: 'Нет токена авторизации' })
  @Patch('update')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  updateVendorName(@Body() dto: UpdateVendorNameDto) {
    return this.vendorService.updateVendorName(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удаление производителя' })
  @ApiOkResponse({
    description: 'Производитель успешно удалён',
    type: VendorEntity,
  })
  @ApiBadRequestResponse({
    description: 'Не предоставлен Id производителя',
  })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @ApiForbiddenResponse({ description: 'Нет токена авторизации' })
  @Delete('delete')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  deleteVendor(@Body() dto: DeleteVendorDto) {
    return this.vendorService.deleteVendor(dto);
  }
}
