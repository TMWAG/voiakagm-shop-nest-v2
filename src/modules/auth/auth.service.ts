import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserError } from 'src/errors/user.errors';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { LoginUserByEmailDto } from './dto/login-user-by-email.dto';
import { MailService } from '../mail/mail.service';
import { ActivateUserByTokenDto } from './dto/activate-user-by-token.dto';
import { RequestRestoreByEmailDto } from './dto/request-restore-by-email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async registerUser(dto: RegisterUserDto): Promise<true | never> {
    try {
      await this.checkUserCredentialsUniquenessOrThrowError(
        dto.email,
        dto.phone,
      );
      const hashedPassword = await bcrypt.hash(dto.password, 5);
      const user = await this.usersService.create({
        ...dto,
        password: hashedPassword,
      });
      this.mailService.sendUserConfirmationEmail(user);
      return true;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async activateUserAndUpdateToken(dto: ActivateUserByTokenDto) {
    try {
      const user = await this.usersService.activateUserByToken(dto.token);
      await this.usersService.updateUserTokenById(user.id);
      return true;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async login(dto: LoginUserByEmailDto) {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) throw new BadRequestException('Указан неверный пароль');
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.SECRET_KEY,
      }),
      id: user.id,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
    };
  }

  async sendRestorationEmail(dto: RequestRestoreByEmailDto) {
    try {
      const user = await this.usersService.getOneUserByEmailOrThrowError(
        dto.email,
      );
      this.mailService.sendRestorationEmail(user);
      return true;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async resetPasswordByToken(dto: ResetPasswordDto, token: string) {
    try {
      const user = await this.usersService.getOneUserByTokenOrThrowError(token);
      await this.usersService.updateUserPasswordById(user.id, dto);
      await this.usersService.updateUserTokenById(user.id);
      return true;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  //utils
  async validateUser(email: string, pass: string) {
    try {
      const user = await this.usersService.getOneUserByEmailOrThrowError(email);
      if (await bcrypt.compare(pass, user.password)) {
        const { password, ...rest } = user;
        return rest;
      }
      return null;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  private async checkUserCredentialsUniquenessOrThrowError(
    email: string,
    phone: string,
  ): Promise<void | never> {
    if (!(await this.usersService.isUserEmailNew(email))) {
      throw new HttpException(
        UserError.notUnique.email,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!(await this.usersService.isUserPhoneNew(phone))) {
      throw new HttpException(
        UserError.notUnique.phone,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
