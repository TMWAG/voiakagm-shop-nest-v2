import {
  Body,
  Controller,
  Delete,
  Post,
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
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateProductPictureDto } from './dto/create-product-picture.dto';
import { DeleteProductPictureDto } from './dto/delete-product-picture.dto';
import { ProductPictureService } from './product-picture.service';

@Controller('product_picture')
export class ProductPictureController {
  constructor(private readonly productPictureService: ProductPictureService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Добавление картинки товару' })
  @ApiOkResponse({
    description: 'Картинка успешно добавлена и записана на диск',
  })
  @ApiBadRequestResponse({ description: 'Не указан id товара' })
  @ApiUnauthorizedResponse({ description: 'Нет токена авторизации' })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @Post('')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('picture'))
  addPicture(
    @Body() dto: CreateProductPictureDto,
    @UploadedFile() picture: Express.Multer.File,
  ) {
    return this.productPictureService.addProductPictureByProductId(
      dto,
      picture,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удаление картинки товаров' })
  @ApiOkResponse({ description: 'Картинка успешно удалена' })
  @ApiBadRequestResponse({ description: 'Не указан id картинки' })
  @ApiUnauthorizedResponse({ description: 'Нет токена авторизации' })
  @ApiForbiddenResponse({ description: 'Роль не соответствует заданным' })
  @Delete('')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  deletePicture(@Body() dto: DeleteProductPictureDto) {
    return this.productPictureService.deleteProductPictureById(dto);
  }
}
