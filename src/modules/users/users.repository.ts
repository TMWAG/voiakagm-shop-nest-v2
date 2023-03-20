import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  async getUserById(id: number): Promise<User | never> {
    return await this.prisma.user.findFirstOrThrow({ where: { id } });
  }

  async getUserByPhone(phone: string): Promise<User | never> {
    return await this.prisma.user.findFirstOrThrow({ where: { phone } });
  }

  async getUserByEmail(email: string): Promise<User | never> {
    return await this.prisma.user.findFirstOrThrow({ where: { email } });
  }

  async getAllUsers(): Promise<Partial<User>[]> {
    return await this.prisma.user.findMany({
      select: { password: false },
    });
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

  async deleteUserById(id: number): Promise<User | never> {
    return await this.prisma.user.delete({ where: { id } });
  }
}
