import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { DeleteUserAddressDto } from './dto/delete-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { UsersAddressesService } from './users-addresses.service';

@Controller('users_addresses')
export class UsersAddressesController {
  constructor(private readonly userAddressesService: UsersAddressesService) {}

  @Post('add')
  @UseGuards(JwtAuthGuard)
  createUserAddress(@Request() { user }, @Body() dto: CreateUserAddressDto) {
    return this.userAddressesService.createUserAddress(user.id, dto);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  getAllUserAddresses(@Request() { user }) {
    return this.userAddressesService.getAllUserAddressesByUserId(user.id);
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  updateUserAddress(@Request() { user }, @Body() dto: UpdateUserAddressDto) {
    return this.userAddressesService.updateUserAddressById(user.id, dto);
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  deleteUserAddress(@Request() { user }, @Body() dto: DeleteUserAddressDto) {
    return this.userAddressesService.deleteUserAddressById(user.id, dto);
  }
}
