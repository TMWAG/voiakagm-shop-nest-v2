import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
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
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiOkResponse({
    description: 'Возвращает массив пользователей',
    type: [User],
  })
  @ApiUnauthorizedResponse({ description: 'Роль пользователя не admin' })
  @Get('all')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  getAll() {
    return this.usersService.getAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменение имени пользователя' })
  @ApiOkResponse({ description: 'Успешное изменение имени', type: User })
  @ApiBadRequestResponse({
    description: 'Не указано новое имя или в нём меньше 2 букв',
  })
  @ApiNotFoundResponse({ description: 'Не найден пользователь с Id в токене' })
  @ApiUnauthorizedResponse({
    description:
      'Пользователь не авторизован или в заголовке запроса отсутствует токен авторизации',
  })
  @Patch('name')
  @UseGuards(JwtAuthGuard)
  updateUserName(@Request() { user }, @Body() dto: UpdateUserNameDto) {
    return this.usersService.updateUserNameById(user.id, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменение фамилии пользователя' })
  @ApiOkResponse({ description: 'Успешное изменение фамилии', type: User })
  @ApiBadRequestResponse({
    description: 'Не указана новая фамилия или она короче 2 символов',
  })
  @ApiNotFoundResponse({ description: 'Не найден пользователь с Id в токене' })
  @ApiUnauthorizedResponse({
    description:
      'Пользователь не авторизован или в заголовке запроса отсутствует токен авторизации',
  })
  @Patch('surname')
  @UseGuards(JwtAuthGuard)
  updateUserSurname(@Request() { user }, @Body() dto: UpdateUserSurnameDto) {
    return this.usersService.updateUserSurnameById(user.id, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменение телефона пользователя' })
  @ApiOkResponse({ description: 'Успешное изменение телефона', type: User })
  @ApiBadRequestResponse({
    description: 'Новый телефон не указан или не соответствует формату',
  })
  @ApiNotFoundResponse({ description: 'Не найден пользователь с Id в токене' })
  @ApiUnauthorizedResponse({
    description:
      'Пользователь не авторизован или в заголовке запроса отсутствует токен авторизации',
  })
  @Patch('phone')
  @UseGuards(JwtAuthGuard)
  updateUserPhone(@Request() { user }, @Body() dto: UpdateUserPhoneDto) {
    return this.usersService.updateUserPhoneById(user.id, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменение роли пользователя' })
  @ApiOkResponse({ description: 'Роль изменена успешно', type: User })
  @ApiBadRequestResponse({ description: 'Указанной роли нет' })
  @ApiNotFoundResponse({ description: 'Не найден пользователь с Id в токене' })
  @ApiUnauthorizedResponse({ description: 'Роль пользователя не Admin' })
  @Patch('role')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  updateUserRole(@Body() dto: UpdateUserRoleDto) {
    return this.usersService.updateUserRoleById(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменение пароля пользователя' })
  @ApiOkResponse({ description: 'Пароль успешно изменён', type: User })
  @ApiBadRequestResponse({ description: 'Пароль и подтверждение не совпадают' })
  @ApiNotFoundResponse({ description: 'Не найден пользователь с Id в токене' })
  @ApiUnauthorizedResponse({
    description:
      'Пользователь не авторизован или в заголовке запроса отсутствует токен авторизации',
  })
  @Patch('password')
  @UseGuards(JwtAuthGuard)
  updateUserPassword(@Request() { user }, @Body() dto: UpdateUserPasswordDto) {
    return this.usersService.updateUserPasswordById(user.id, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Добавление/изменение ссылки на ВК' })
  @ApiOkResponse({ description: 'Ссылка успешно изменена', type: User })
  @ApiBadRequestResponse({ description: 'Ссылка не указана' })
  @ApiNotFoundResponse({ description: 'Не найден пользователь с Id в токене' })
  @ApiUnauthorizedResponse({
    description:
      'Пользователь не авторизован или в заголовке запроса отсутствует токен авторизации',
  })
  @Patch('vk_link')
  @UseGuards(JwtAuthGuard)
  updateUserVkLink(@Request() { user }, @Body() dto: AddVkLinkDto) {
    return this.usersService.updateUserVkLinkById(user.id, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Добавление/изменение ссылки на телеграм' })
  @ApiOkResponse({ description: 'Ссылка успешно изменена', type: User })
  @ApiBadRequestResponse({ description: 'Ссылка не указана' })
  @ApiNotFoundResponse({ description: 'Не найден пользователь с Id в токене' })
  @ApiUnauthorizedResponse({
    description:
      'Пользователь не авторизован или в заголовке запроса отсутствует токен авторизации',
  })
  @Patch('tg_link')
  @UseGuards(JwtAuthGuard)
  updateUserTgLink(@Request() { user }, @Body() dto: AddTgLinkDto) {
    return this.usersService.updateUserTgLinkById(user.id, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiOkResponse({ description: 'Пользователь успешно удалён', type: User })
  @ApiBadRequestResponse({ description: 'Не указан Id пользователя' })
  @ApiNotFoundResponse({ description: 'Не найден пользователь с Id в токене' })
  @ApiUnauthorizedResponse({ description: 'Роль пользователя не Admin' })
  @Delete('delete')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  deleteUser(@Body() dto: DeleteUserDto) {
    return this.usersService.deleteUserById(dto);
  }
}
