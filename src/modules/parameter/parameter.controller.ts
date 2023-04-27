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
import { CreateParameterDto } from './dto/create-parameter.dto';
import { DeleteParameterDto } from './dto/delete-parameter.dto';
import { GetAllParametersByCategoryId } from './dto/get-all-parameters-by-category-id.dto';
import { UpdateParameterCategoryByIdDto } from './dto/update-parameter-category.dto';
import { UpdateParameterNameByIdDto } from './dto/update-parameter-name.dto';
import { ParameterCreateEntity } from './entities/parameter-create.entity';
import { ParameterService } from './parameter.service';

@ApiTags('Parameter')
@Controller('parameter')
export class ParameterController {
  constructor(private readonly parameterService: ParameterService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создание параметра' })
  @ApiOkResponse({
    description: 'Параметр успешно создан',
    type: ParameterCreateEntity,
  })
  @ApiBadRequestResponse({
    description: 'Не указан Id категории или название параметра',
  })
  @ApiUnauthorizedResponse({ description: 'Нет токена авторизации' })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @Post('add')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  createParameter(@Body() dto: CreateParameterDto) {
    return this.parameterService.createParameter(dto);
  }

  @ApiOperation({ summary: 'Получение всех параметров категории' })
  @ApiOkResponse({
    description: 'Параметры успешно получены',
    type: [ParameterCreateEntity],
  })
  @Get('all')
  getAllParametersByCategoryId(@Query() dto: GetAllParametersByCategoryId) {
    return this.parameterService.getAllParametersByCategoryId(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменения названия параметра' })
  @ApiOkResponse({
    description: 'Название успешно изменено',
    type: ParameterCreateEntity,
  })
  @ApiBadRequestResponse({
    description: 'Не указан id параметра или новое название',
  })
  @ApiUnauthorizedResponse({ description: 'Нет токена авторизации' })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @Patch('name')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  updateParameterName(@Body() dto: UpdateParameterNameByIdDto) {
    return this.parameterService.updateParameterNameById(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменение категории параметра' })
  @ApiOkResponse({ description: 'Категория успешно изменена' })
  @ApiBadRequestResponse({
    description: 'Не указан Id параметра или id категории',
  })
  @ApiUnauthorizedResponse({ description: 'Нет токена авторизации' })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @Patch('category')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  updateParameterCategory(@Body() dto: UpdateParameterCategoryByIdDto) {
    return this.parameterService.updateParameterCategoryById(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удаление параметра' })
  @ApiOkResponse({ description: 'Параметр успешно удалён' })
  @ApiBadRequestResponse({ description: 'Не указан Id параметра' })
  @ApiUnauthorizedResponse({ description: 'Нет токена авторизации' })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @Delete('delete')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  deleteParameter(@Body() dto: DeleteParameterDto) {
    return this.parameterService.deleteParameterById(dto);
  }
}
