import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserByEmailDto } from './dto/login-user-by-email.dto';
import { QueryTokenDto } from './dto/query-token.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { RequestRestoreByEmailDto } from './dto/request-restore-by-email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiOkResponse({ description: 'Успешная регистрация' })
  @Post('registration')
  register(@Body() dto: RegisterUserDto) {
    return this.authService.registerUser(dto);
  }

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiOkResponse({
    description: 'Успешная авторизация пользователя',
    type: 'access_token',
  })
  @ApiBadRequestResponse({ description: 'Неверные данные для входа' })
  @Post('login')
  login(@Body() dto: LoginUserByEmailDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Запрос восстановления пароля' })
  @ApiQuery({ name: 'token', type: QueryTokenDto })
  @ApiOkResponse({ description: 'Письмо отправлено на почту', type: Boolean })
  @ApiNotFoundResponse({ description: 'Пользователь не найден по почте' })
  @Post('restore_request')
  requestPasswordRestoration(@Body() dto: RequestRestoreByEmailDto) {
    return this.authService.sendRestorationEmail(dto);
  }

  @ApiOperation({ summary: 'Изменение пароля по токену' })
  @ApiQuery({ name: 'token', description: 'Токен пользователя' })
  @ApiBody({
    description: 'Новый пароль и его подтверждение',
    type: ResetPasswordDto,
  })
  @ApiOkResponse({ description: 'Пароль успешно изменён' })
  @ApiBadRequestResponse({ description: 'Пароли не совпадают' })
  @Post('restore_password')
  resetPassword(@Body() dto: ResetPasswordDto, @Query() token: QueryTokenDto) {
    return this.authService.resetPasswordByToken(dto, token.token);
  }

  @ApiOperation({ summary: 'Подтверждение почты' })
  @ApiQuery({ name: 'token', type: QueryTokenDto })
  @ApiOkResponse({
    description: 'Почта успешно подтверждена, аккаунт активирован',
    type: Boolean,
  })
  @Get('confirm_email')
  confirmEmail(@Query() dto: QueryTokenDto) {
    return this.authService.activateUserAndUpdateToken(dto);
  }
}
