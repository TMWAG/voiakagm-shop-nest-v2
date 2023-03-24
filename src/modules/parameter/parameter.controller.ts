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
import { CreateParameterDto } from './dto/create-parameter.dto';
import { DeleteParameterDto } from './dto/delete-parameter.dto';
import { GetAllParametersByCategoryId } from './dto/get-all-parameters-by-category-id.dto';
import { UpdateParameterCategoryByIdDto } from './dto/update-parameter-category.dto';
import { UpdateParameterNameByIdDto } from './dto/update-parameter-name.dto';
import { ParameterService } from './parameter.service';

@Controller('parameter')
export class ParameterController {
  constructor(private readonly parameterService: ParameterService) {}

  @Post('add')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  createParameter(@Body() dto: CreateParameterDto) {
    return this.parameterService.createParameter(dto);
  }

  @Get('all')
  getAllParameters() {
    return this.parameterService.getAllParameters();
  }

  @Get('all')
  getAllParametersByCategoryId(@Query() dto: GetAllParametersByCategoryId) {
    return this.parameterService.getAllParametersByCategoryId(dto);
  }

  @Patch('name')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  updateParameterName(@Body() dto: UpdateParameterNameByIdDto) {
    return this.parameterService.updateParameterNameById(dto);
  }

  @Patch('category')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  updateParameterCategory(@Body() dto: UpdateParameterCategoryByIdDto) {
    return this.parameterService.updateParameterCategoryById(dto);
  }

  @Delete('delete')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  deleteParameter(@Body() dto: DeleteParameterDto) {
    return this.parameterService.deleteParameterById(dto);
  }
}
