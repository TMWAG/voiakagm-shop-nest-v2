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
import { Role } from '@prisma/client';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateProductPictureDto } from './dto/create-product-picture.dto';
import { DeleteProductPictureDto } from './dto/delete-product-picture.dto';
import { ProductPictureService } from './product-picture.service';

@Controller('product_picture')
export class ProductPictureController {
  constructor(private readonly productPictureService: ProductPictureService) {}

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

  @Delete('')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  deletePicture(@Body() dto: DeleteProductPictureDto) {
    return this.productPictureService.deleteProductPictureById(dto);
  }
}
