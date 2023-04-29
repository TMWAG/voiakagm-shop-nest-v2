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
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { UpdateUserLinksDto } from './dto/update-user-links.dto';

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
  @ApiOperation({ summary: 'Изменение имени, фамилии, номера телефона' })
  @ApiOkResponse({
    description: 'Успешное изменение информации пользователя',
    type: User,
  })
  @ApiBadRequestResponse({
    description:
      'Неверный формат данных или данные используются другими пользователями',
  })
  @ApiNotFoundResponse({
    description: 'Пользователь не найден',
  })
  @ApiUnauthorizedResponse({
    description: 'Нет токена или он просрочен',
  })
  @Patch('info')
  @UseGuards(JwtAuthGuard)
  updateUserInfo(@Request() { user }, @Body() dto: UpdateUserInfoDto) {
    return this.usersService.updateUserInfoById(user.id, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменение ссылок на соцсети' })
  @ApiOkResponse({
    description: 'Успешное изменение ссылок пользователя',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Ссылка/и принадлежат другому пользователю',
  })
  @ApiNotFoundResponse({
    description: 'Пользователь не найден',
  })
  @ApiUnauthorizedResponse({
    description: 'Нет токена авторизации или он просрочен',
  })
  @Patch('links')
  @UseGuards(JwtAuthGuard)
  updateUserLinks(@Request() { user }, @Body() dto: UpdateUserLinksDto) {
    return this.usersService.updateUserLinks(user.id, dto);
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
