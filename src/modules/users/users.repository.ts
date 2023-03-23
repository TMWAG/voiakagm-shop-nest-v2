import { Injectable } from '@nestjs/common';
import { Prisma, Role, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  //create
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  //read
  async getUserById(id: number): Promise<User | never> {
    return await this.prisma.user.findFirst({ where: { id } });
  }

  async getUserByPhone(phone: string): Promise<User | never> {
    return await this.prisma.user.findFirst({ where: { phone } });
  }

  async getUserByEmail(email: string): Promise<User | never> {
    return await this.prisma.user.findFirst({ where: { email } });
  }

  async getUserByToken(token: string): Promise<User | never> {
    return await this.prisma.user.findFirst({ where: { token } });
  }

  async getAllUsers(): Promise<Partial<User>[]> {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        tgLink: true,
        vkLink: true,
      },
    });
  }

  //update
  async updateUserNameById(name: string, id: number): Promise<User | never> {
    return this.prisma.user.update({ where: { id }, data: { name } });
  }

  async updateUserSurnameById(
    surname: string,
    id: number,
  ): Promise<User | never> {
    return this.prisma.user.update({ where: { id }, data: { surname } });
  }

  async updateUserPhoneById(phone: string, id: number): Promise<User | never> {
    return this.prisma.user.update({ where: { id }, data: { phone } });
  }

  async updateUserRoleById(role: Role, id: number): Promise<User | never> {
    return this.prisma.user.update({ where: { id }, data: { role } });
  }

  async updateUserPasswordById(
    id: number,
    password: string,
  ): Promise<User | never> {
    return this.prisma.user.update({ where: { id }, data: { password } });
  }

  async updateUserTgLinkById(
    tgLink: string,
    id: number,
  ): Promise<User | never> {
    return await this.prisma.user.update({ where: { id }, data: { tgLink } });
  }

  async updateUserVkLinkById(
    vkLink: string,
    id: number,
  ): Promise<User | never> {
    return await this.prisma.user.update({ where: { id }, data: { vkLink } });
  }

  async activateUserByToken(token: string): Promise<User | never> {
    return await this.prisma.user.update({
      where: { token },
      data: { isActive: true },
    });
  }

  async updateUserTokenById(id: number, token: string): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: { token },
    });
  }

  //delete
  async deleteUserById(id: number): Promise<User | never> {
    return await this.prisma.user.delete({ where: { id } });
  }
}
