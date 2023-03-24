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
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { UpdateCategoryNameDto } from './dto/update-category-name.dto';
import { CategoryEntity } from './entities/category.entity';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Добавление новой категории' })
  @ApiOkResponse({
    description: 'Успешное создание категории',
    type: CategoryEntity,
  })
  @ApiBadRequestResponse({
    description: 'Не предоставлено имя новой категории',
  })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @ApiUnauthorizedResponse({ description: 'Нет токена авторизации' })
  @Post('add')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @ApiOperation({ summary: 'Получение всех категорий' })
  @ApiOkResponse({
    description: 'Успешное получение ролей',
    type: [CategoryEntity],
  })
  @Get('all')
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @ApiOperation({ summary: 'Изменение названия категории' })
  @ApiOkResponse({
    description: 'Название успешно изменено',
    type: CategoryEntity,
  })
  @ApiBadRequestResponse({ description: 'Не предоставлено новое название' })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @ApiUnauthorizedResponse({ description: 'Нет токена авторизации' })
  @Patch('update')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  updateCategoryName(@Body() dto: UpdateCategoryNameDto) {
    return this.categoryService.updateCategoryNameById(dto);
  }

  @ApiOperation({ summary: 'Удаление категории' })
  @ApiOkResponse({
    description: 'Категория успешно удалена',
    type: CategoryEntity,
  })
  @ApiBadRequestResponse({ description: 'Не предоставлен id категории' })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @ApiUnauthorizedResponse({ description: 'Нет токена авторизации' })
  @Delete('delete')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  deleteCategory(@Body() dto: DeleteCategoryDto) {
    return this.categoryService.deleteCategoryById(dto);
  }
}
