import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AddTgLinkDto } from './dto/add-tg-link.dto';
import { AddVkLinkDto } from './dto/add-vk-link.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { UpdateUserNameDto } from './dto/update-user-name.dto';
import { UpdateUserSurnameDto } from './dto/update-user-surname.dto';
import { UpdateUserPhoneDto } from './dto/update-user-phone.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

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
  async updateUserNameById(id: number, dto: UpdateUserNameDto) {
    await this.getOneUserByIdOrThrowError(id);
    return this.repository.updateUserNameById(id, dto.name);
  }

  async updateUserSurnameById(id: number, dto: UpdateUserSurnameDto) {
    await this.getOneUserByIdOrThrowError(id);
    return this.repository.updateUserSurnameById(id, dto.surname);
  }

  async updateUserPhoneById(id: number, dto: UpdateUserPhoneDto) {
    await this.getOneUserByIdOrThrowError(id);
    if (!(await this.isUserPhoneNew(dto.phone)))
      throw new BadRequestException('Данный номер телефона уже занят');
    return await this.repository.updateUserPhoneById(id, dto.phone);
  }

  async updateUserRoleById(dto: UpdateUserRoleDto) {
    await this.getOneUserByIdOrThrowError(dto.id);
    return this.repository.updateUserRoleById(dto.id, dto.role);
  }

  async updateUserVkLinkById(id: number, dto: AddVkLinkDto) {
    const user = await this.repository.getUserByVkLink(dto.vkLink);
    if (user)
      throw new BadRequestException(
        'Эта страница ВК уже привязана к другому профилю',
      );
    await this.getOneUserByIdOrThrowError(id);
    return this.repository.updateUserVkLinkById(id, dto.vkLink);
  }

  async updateUserTgLinkById(id: number, dto: AddTgLinkDto) {
    const user = await this.repository.getUserByTgLink(dto.tgLink);
    if (user)
      throw new BadRequestException(
        'Эта ссылка уже привязана к другому профилю',
      );
    await this.getOneUserByIdOrThrowError(id);
    return this.repository.updateUserTgLinkById(id, dto.tgLink);
  }

  async activateUserByToken(token: string) {
    return await this.repository.activateUserByToken(token);
  }

  async updateUserTokenById(id: number) {
    const newToken = randomUUID();
    return await this.repository.updateUserTokenById(id, newToken);
  }

  async updateUserPasswordById(id: number, dto: UpdateUserPasswordDto) {
    if (dto.password !== dto.passwordConfirmation)
      throw new BadRequestException('Пароли не совпадают');
    await this.getOneUserByIdOrThrowError(id);
    const newPassword = await bcrypt.hash(dto.password, 5);
    return await this.repository.updateUserPasswordById(id, newPassword);
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
