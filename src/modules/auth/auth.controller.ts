import { Body, Controller, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserByEmailDto } from './dto/login-user-by-email.dto';
import { QueryTokenDto } from './dto/query-token.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { RequestRestoreByEmailDto } from './dto/request-restore-by-email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  register(@Body() dto: RegisterUserDto) {
    return this.authService.registerUser(dto);
  }

  @Post('login')
  login(@Body() dto: LoginUserByEmailDto) {
    return this.authService.login(dto);
  }

  @Post('restore_request')
  requestPasswordRestoration(@Body() dto: RequestRestoreByEmailDto) {
    return this.authService.sendRestorationEmail(dto);
  }

  @Post('restore_password')
  resetPassword(@Body() dto: ResetPasswordDto, @Query() token: QueryTokenDto) {
    return this.authService.resetPasswordByToken(dto, token.token);
  }

  @Post('confirm_email')
  confirmEmail(@Query() dto: QueryTokenDto) {
    return this.authService.activateUserAndUpdateToken(dto);
  }
}
