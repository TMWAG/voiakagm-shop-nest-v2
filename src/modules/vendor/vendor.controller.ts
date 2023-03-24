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
import { CreateVendorDto } from './dto/create-vendor.dto';
import { DeleteVendorDto } from './dto/delete-vendor.dto';
import { UpdateVendorNameDto } from './dto/update-vendor-name.dto';
import { VendorService } from './vendor.service';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post('add')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  crateVendor(@Body() dto: CreateVendorDto) {
    return this.vendorService.createVendor(dto);
  }

  @Get('all')
  getAllVendors() {
    return this.vendorService.getAllVendors();
  }

  @Patch('update')
  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @UseGuards(RolesGuard)
  updateVendorName(@Body() dto: UpdateVendorNameDto) {
    return this.vendorService.updateVendorName(dto);
  }

  @Delete('delete')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  deleteVendor(@Body() dto: DeleteVendorDto) {
    return this.vendorService.deleteVendor(dto);
  }
}
