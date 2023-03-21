import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserError } from 'src/errors/user.errors';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { LoginUserByEmailDto } from './dto/login-user-by-email.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(dto: RegisterUserDto): Promise<true | never> {
    await this.checkUserCredentialsUniquenessOrThrowError(dto.email, dto.phone);
    const hashedPassword = await bcrypt.hash(dto.password, 5);
    await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });
    return true;
  }

  async login(dto: LoginUserByEmailDto) {
    const user = await this.usersService.getUserByEmailOrThrowError(dto.email);
    const payload = { id: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.SECRET_KEY,
      }),
    };
  }

  //utils
  async validateUser(
    email: string,
    pass: string,
  ): Promise<Partial<User> | null> {
    const user = await this.usersService.getUserByEmail(email);
    if (await bcrypt.compare(pass, user.password)) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
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
