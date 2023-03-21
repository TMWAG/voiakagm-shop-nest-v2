import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return await this.repository.createUser(createUserDto);
  }

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
    if (!user) throw new NotFoundException();
    return user;
  }

  async getUserByEmailOrThrowError(email: string) {
    const user = await this.repository.getUserByEmail(email);
    if (!user) throw new NotFoundException();
    return user;
  }

  //utils
  async isUserEmailNew(email: string): Promise<boolean> {
    return Boolean(!(await this.repository.getUserByEmail(email)));
  }

  async isUserPhoneNew(phone: string): Promise<boolean> {
    return Boolean(!(await this.repository.getUserByPhone(phone)));
  }
}
