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
import { Role } from '@prisma/client';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { DeleteRecommendationDto } from './dto/delete-recommendation.dto';
import { GetAllRecommendationsByVendorId } from './dto/get-all-recommendateions-by-vendor.dto';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';
import { RecommendationService } from './recommendation.service';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

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

  @Get('all')
  getAll() {
    return this.recommendationService.getAll();
  }

  @Get('vendor')
  getAllByVendor(@Query() dto: GetAllRecommendationsByVendorId) {
    return this.recommendationService.getAllByVendor(dto);
  }

  @Patch('')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('picture'))
  update(
    @Body() dto: UpdateRecommendationDto,
    @UploadedFile() picture: Express.Multer.File,
  ) {
    return this.recommendationService.update(dto, picture);
  }

  @Delete('')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  delete(@Body() dto: DeleteRecommendationDto) {
    console.log(dto);
    return this.recommendationService.deleteRecommendation(dto);
  }
}
