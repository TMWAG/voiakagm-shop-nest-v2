import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { UpdateUserLinksDto } from './dto/update-user-links.dto';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  //create
  async create(createUserDto: CreateUserDto) {
    return await this.repository.createUser(createUserDto);
  }

  //get
  async getAll() {
    return await this.repository.getAllUsers();
  }

  async getOneUserById(id: number) {
    return await this.repository.getUserById(id);
  }

  async getUserByEmail(email: string) {
    return await this.repository.getUserByEmail(email);
  }

  async getOneUserByIdOrThrowError(id: number) {
    const user = await this.repository.getUserById(id);
    if (!user)
      throw new NotFoundException(`Пользователь с Id: ${id} не найден`);
    return user;
  }

  async getOneUserByEmailOrThrowError(email: string) {
    const user = await this.repository.getUserByEmail(email);
    if (!user)
      throw new NotFoundException(`Пользователь с почтой ${email} не найден`);
    return user;
  }

  async getOneUserByTokenOrThrowError(token: string) {
    const user = await this.repository.getUserByToken(token);
    if (!user) throw new NotFoundException('Не удалось найти пользователя');
    return user;
  }

  //update
  async updateUserInfoById(id: number, dto: UpdateUserInfoDto) {
    await this.getOneUserByIdOrThrowError(id);
    if (dto.phone) {
      if (!(await this.isUserPhoneNew(dto.phone)))
        throw new BadRequestException('Данный номер телефона уже используется');
    }
    return await this.repository.updateUserInfoById(
      id,
      dto.name,
      dto.surname,
      dto.phone,
    );
  }

  async updateUserLinks(id: number, dto: UpdateUserLinksDto) {
    await this.getOneUserByIdOrThrowError(id);
    if (dto.tgLink) {
      if (await this.repository.getUserByTgLink(dto.tgLink))
        throw new BadRequestException('Эта ссылка уже используется');
    }
    if (dto.vkLink) {
      if (await this.repository.getUserByVkLink(dto.vkLink))
        throw new BadRequestException('Эта ссылка уже используется');
    }
    return await this.repository.updateUserLinksById(
      id,
      dto.vkLink,
      dto.tgLink,
    );
  }

  async updateUserPasswordById(id: number, dto: UpdateUserPasswordDto) {
    if (dto.password !== dto.passwordConfirmation)
      throw new BadRequestException('Пароли не совпадают');
    await this.getOneUserByIdOrThrowError(id);
    const newPassword = await bcrypt.hash(dto.password, 5);
    return await this.repository.updateUserPasswordById(id, newPassword);
  }

  async updateUserRoleById(dto: UpdateUserRoleDto) {
    await this.getOneUserByIdOrThrowError(dto.id);
    return this.repository.updateUserRoleById(dto.id, dto.role);
  }

  async activateUserByToken(token: string) {
    return await this.repository.activateUserByToken(token);
  }

  async updateUserTokenById(id: number) {
    const newToken = randomUUID();
    return await this.repository.updateUserTokenById(id, newToken);
  }

  //delete
  async deleteUserById(dto: DeleteUserDto) {
    await this.getOneUserByIdOrThrowError(dto.id);
    return this.repository.deleteUserById(dto.id);
  }

  //utils
  async isUserEmailNew(email: string): Promise<boolean> {
    return Boolean(!(await this.repository.getUserByEmail(email)));
  }

  async isUserPhoneNew(phone: string): Promise<boolean> {
    return Boolean(!(await this.repository.getUserByPhone(phone)));
  }
}
