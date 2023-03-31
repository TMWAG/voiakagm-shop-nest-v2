import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { DeliveryServiceService } from './delivery-service.service';
import { CreateDeliveryServiceDto } from './dto/create-delivery-service.dto';
import { DeleteDeliveryServiceDto } from './dto/delete-delevery-service.dto';
import { UpdateDeliveryServiceDto } from './dto/update-delivery-service.dto';

@Controller('delivery_service')
export class DeliveryServiceController {
  constructor(
    private readonly deliveryServiceService: DeliveryServiceService,
  ) {}

  @Post('')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateDeliveryServiceDto) {
    return this.deliveryServiceService.create(dto);
  }

  @Get('')
  getAll() {
    return this.deliveryServiceService.getAll();
  }

  @Patch('')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  update(@Body() dto: UpdateDeliveryServiceDto) {
    return this.deliveryServiceService.update(dto);
  }

  @Delete('')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  delete(@Body() dto: DeleteDeliveryServiceDto) {
    return this.deliveryServiceService.delete(dto);
  }
}
