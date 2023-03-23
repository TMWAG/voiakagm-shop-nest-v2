import { Injectable } from '@nestjs/common';
import { Prisma, Role, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  private readonly select = {
    id: true,
    name: true,
    surname: true,
    email: true,
    phone: true,
    role: true,
    isActive: true,
    tgLink: true,
    vkLink: true,
    password: false,
    token: false,
  };
  //create
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  //read
  async getUserById(id: number): Promise<User | never> {
    return await this.prisma.user.findFirst({
      where: { id },
      select: this.select,
    });
  }

  async getUserByPhone(phone: string): Promise<User | never> {
    return await this.prisma.user.findFirst({
      where: { phone },
      select: this.select,
    });
  }

  async getUserByEmail(email: string): Promise<User | never> {
    return await this.prisma.user.findFirst({
      where: { email },
      select: this.select,
    });
  }

  async getUserByToken(token: string): Promise<User | never> {
    return await this.prisma.user.findFirst({
      where: { token },
      select: this.select,
    });
  }

  async getAllUsers(): Promise<Partial<User>[]> {
    return await this.prisma.user.findMany({
      select: this.select,
    });
  }

  //update
  async updateUserNameById(id: number, name: string): Promise<User | never> {
    return this.prisma.user.update({
      where: { id },
      data: { name },
      select: this.select,
    });
  }

  async updateUserSurnameById(
    id: number,
    surname: string,
  ): Promise<User | never> {
    return this.prisma.user.update({
      where: { id },
      data: { surname },
      select: this.select,
    });
  }

  async updateUserPhoneById(id: number, phone: string): Promise<User | never> {
    return this.prisma.user.update({
      where: { id },
      data: { phone },
      select: this.select,
    });
  }

  async updateUserRoleById(id: number, role: Role): Promise<User | never> {
    return this.prisma.user.update({
      where: { id },
      data: { role },
      select: this.select,
    });
  }

  async updateUserPasswordById(
    id: number,
    password: string,
  ): Promise<User | never> {
    return this.prisma.user.update({
      where: { id },
      data: { password },
      select: this.select,
    });
  }

  async updateUserTgLinkById(
    id: number,
    tgLink: string,
  ): Promise<User | never> {
    return await this.prisma.user.update({
      where: { id },
      data: { tgLink },
      select: this.select,
    });
  }

  async updateUserVkLinkById(
    id: number,
    vkLink: string,
  ): Promise<User | never> {
    return await this.prisma.user.update({
      where: { id },
      data: { vkLink },
      select: this.select,
    });
  }

  async activateUserByToken(token: string): Promise<User | never> {
    return await this.prisma.user.update({
      where: { token },
      data: { isActive: true },
      select: this.select,
    });
  }

  async updateUserTokenById(id: number, token: string): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: { token },
      select: this.select,
    });
  }

  //delete
  async deleteUserById(id: number): Promise<User | never> {
    return await this.prisma.user.delete({
      where: { id },
      select: this.select,
    });
  }
}
