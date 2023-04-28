import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { DeleteRecommendationDto } from './dto/delete-recommendation.dto';
import { GetAllRecommendationsByVendorId } from './dto/get-all-recommendateions-by-vendor.dto';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';
import { RecommendationEntity } from './entities/recommendation.entity';
import { RecommendationService } from './recommendation.service';

@ApiTags('Recommendations')
@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создание новой рекомендации' })
  @ApiOkResponse({
    description: 'Рекомендация успешно создана',
    type: RecommendationEntity,
  })
  @ApiBadRequestResponse({
    description: 'Указаны не все данные или они имеют неверный формат',
  })
  @ApiUnauthorizedResponse({
    description: 'Нет токена авторизации',
  })
  @ApiForbiddenResponse({
    description: 'Роль не соответствует заданным',
  })
  @Post('')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('picture'))
  create(
    @Body() dto: CreateRecommendationDto,
    @UploadedFile() picture: Express.Multer.File,
  ) {
    return this.recommendationService.create(dto, picture);
  }

  @ApiOperation({ summary: 'Получение всех рекомендаций' })
  @ApiOkResponse({
    description: 'Рекомендации успешно получены',
    type: [RecommendationEntity],
  })
  @Get('all')
  getAll() {
    return this.recommendationService.getAll();
  }

  @ApiOperation({ summary: 'Получение всех рекомендаций производителя' })
  @ApiOkResponse({
    description: 'Рекомендации успешно получены',
    type: [RecommendationEntity],
  })
  @ApiBadRequestResponse({
    description: 'Не указан Id производителя',
  })
  @Get('vendor')
  getAllByVendor(@Query() dto: GetAllRecommendationsByVendorId) {
    return this.recommendationService.getAllByVendor(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменение рекомендации' })
  @ApiOkResponse({
    description: 'Успешное изменение рекомендации',
    type: RecommendationEntity,
  })
  @ApiBadRequestResponse({
    description: 'Не указаны новые данные или они имеют неверный формат',
  })
  @ApiUnauthorizedResponse({
    description: 'Нет токена авторизации',
  })
  @ApiForbiddenResponse({
    description: 'Роль не соответствует заданным',
  })
  @Patch()
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('picture'))
  update(
    @Body() dto: UpdateRecommendationDto,
    @UploadedFile() picture: Express.Multer.File,
  ) {
    return this.recommendationService.update(dto, picture);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удаление рекомендации' })
  @ApiOkResponse({
    description: 'Успешное удаление рекомендации',
    type: RecommendationEntity,
  })
  @ApiBadRequestResponse({
    description: 'Не указан Id рекомендации',
  })
  @ApiUnauthorizedResponse({
    description: 'Нет токена авторизации',
  })
  @ApiForbiddenResponse({
    description: 'Роль не соответствует заданным',
  })
  @Delete('')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  delete(@Body() dto: DeleteRecommendationDto) {
    return this.recommendationService.deleteRecommendation(dto);
  }
}
