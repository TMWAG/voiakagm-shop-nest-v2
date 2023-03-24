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
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { DeleteUserAddressDto } from './dto/delete-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { UserAddressEntity } from './entities/user-address.entity';
import { UsersAddressesService } from './users-addresses.service';

@ApiTags('User Addresses')
@Controller('users_addresses')
export class UsersAddressesController {
  constructor(private readonly userAddressesService: UsersAddressesService) {}

  @ApiOperation({ summary: 'Добавление нового адреса' })
  @ApiOkResponse({
    description: 'Новый адрес успешно создан',
    type: UserAddressEntity,
  })
  @ApiUnauthorizedResponse({ description: 'Нет токена авторизации' })
  @ApiBadRequestResponse({ description: 'Не указан адрес' })
  @Post('add')
  @UseGuards(JwtAuthGuard)
  createUserAddress(@Request() { user }, @Body() dto: CreateUserAddressDto) {
    return this.userAddressesService.createUserAddress(user.id, dto);
  }

  @ApiOperation({ summary: 'Получение всех адресов пользователя' })
  @ApiOkResponse({
    description: 'Возвращает массив адресов',
    type: [UserAddressEntity],
  })
  @ApiUnauthorizedResponse({ description: 'Нет токена авторизации' })
  @Get('all')
  @UseGuards(JwtAuthGuard)
  getAllUserAddresses(@Request() { user }) {
    return this.userAddressesService.getAllUserAddressesByUserId(user.id);
  }

  @ApiOperation({ summary: 'Обновление адреса пользователя' })
  @ApiOkResponse({
    description: 'Адрес успешно обновлён',
    type: UserAddressEntity,
  })
  @ApiUnauthorizedResponse({ description: 'Нет токена авторизации' })
  @ApiBadRequestResponse({ description: 'Не указан новый адрес' })
  @Patch('update')
  @UseGuards(JwtAuthGuard)
  updateUserAddress(@Request() { user }, @Body() dto: UpdateUserAddressDto) {
    return this.userAddressesService.updateUserAddressById(user.id, dto);
  }

  @ApiOperation({ summary: 'Удаление адреса пользователя' })
  @ApiOkResponse({
    description: 'Адрес успешно удалён',
    type: UserAddressEntity,
  })
  @ApiUnauthorizedResponse({ description: 'Нет токена авторизации' })
  @ApiBadRequestResponse({ description: 'Не указан Id адреса' })
  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  deleteUserAddress(@Request() { user }, @Body() dto: DeleteUserAddressDto) {
    return this.userAddressesService.deleteUserAddressById(user.id, dto);
  }
}
