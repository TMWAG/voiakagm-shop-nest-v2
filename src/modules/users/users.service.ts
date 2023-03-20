import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.repository.createUser(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  //utils
  async isUserEmailNew(email: string): Promise<boolean> {
    return Boolean(!(await this.repository.getUserByEmail(email)));
  }

  async isUserPhoneNew(phone: string): Promise<boolean> {
    return Boolean(!(await this.repository.getUserByPhone(phone)));
  }
}
