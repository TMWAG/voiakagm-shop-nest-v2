import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async getUserById(id: number): Promise<User | never> {
    return this.prisma.user.findFirstOrThrow({ where: { id } });
  }

  // async getUserByPhone(
  //   where: Prisma.UserWhereUniqueInput,
  // ): Promise<>
}
