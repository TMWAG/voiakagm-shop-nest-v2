import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AddTgLinkDto } from './dto/add-tg-link.dto';
import { AddVkLinkDto } from './dto/add-vk-link.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserNameDto } from './dto/update-user-name.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserPhoneDto } from './dto/update-user-phone.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UpdateUserSurnameDto } from './dto/update-user-surname.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  getAll() {
    return this.usersService.getAll();
  }

  @Patch('name')
  @UseGuards(JwtAuthGuard)
  updateUserName(@Request() { user }, @Body() dto: UpdateUserNameDto) {
    return this.usersService.updateUserNameById(user.id, dto);
  }

  @Patch('surname')
  @UseGuards(JwtAuthGuard)
  updateUserSurname(@Request() { user }, @Body() dto: UpdateUserSurnameDto) {
    return this.usersService.updateUserSurnameById(user.id, dto);
  }

  @Patch('phone')
  @UseGuards(JwtAuthGuard)
  updateUserPhone(@Request() { user }, @Body() dto: UpdateUserPhoneDto) {
    return this.usersService.updateUserPhoneById(user.id, dto);
  }

  @Patch('role')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  updateUserRole(@Body() dto: UpdateUserRoleDto) {
    return this.usersService.updateUserRoleById(dto);
  }

  @Patch('password')
  @UseGuards(JwtAuthGuard)
  updateUserPassword(@Request() { user }, @Body() dto: UpdateUserPasswordDto) {
    return this.usersService.updateUserPasswordById(user.id, dto);
  }
  @Patch('vk_link')
  @UseGuards(JwtAuthGuard)
  updateUserVkLink(@Request() { user }, @Body() dto: AddVkLinkDto) {
    return this.usersService.updateUserVkLinkById(user.id, dto);
  }

  @Patch('tg_link')
  @UseGuards(JwtAuthGuard)
  updateUserTgLink(@Request() { user }, @Body() dto: AddTgLinkDto) {
    return this.usersService.updateUserTgLinkById(user.id, dto);
  }

  @Delete('delete')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  deleteUser(@Body() dto: DeleteUserDto) {
    return this.usersService.deleteUserById(dto);
  }
}
