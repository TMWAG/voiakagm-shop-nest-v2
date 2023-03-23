import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

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
  async updateUserTokenById(id: number) {
    const newToken = randomUUID();
    return await this.repository.updateUserTokenById(id, newToken);
  }

  async activateUserByToken(token: string) {
    return await this.repository.activateUserByToken(token);
  }

  async updateUserPasswordById(id: number, password: string) {
    return await this.repository.updateUserPasswordById(id, password);
  }

  //utils
  async isUserEmailNew(email: string): Promise<boolean> {
    return Boolean(!(await this.repository.getUserByEmail(email)));
  }

  async isUserPhoneNew(phone: string): Promise<boolean> {
    return Boolean(!(await this.repository.getUserByPhone(phone)));
  }
}
