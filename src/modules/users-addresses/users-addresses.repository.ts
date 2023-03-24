import { Injectable } from '@nestjs/common';
import { UserAddress } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserAddressRepository {
  constructor(private prisma: PrismaService) {}

  //create
  async createUserAddress(
    userId: number,
    address: string,
  ): Promise<UserAddress> {
    return await this.prisma.userAddress.create({ data: { userId, address } });
  }

  //get
  async getAllAddressesByUserId(userId: number): Promise<UserAddress[]> {
    return await this.prisma.userAddress.findMany({ where: { userId } });
  }

  async getOneById(id: number): Promise<UserAddress> {
    return await this.prisma.userAddress.findFirst({ where: { id } });
  }

  //update
  async updateAddressById(id: number, address: string): Promise<UserAddress> {
    return await this.prisma.userAddress.update({
      where: { id },
      data: { address },
    });
  }

  //delete
  async deleteAddressById(id: number): Promise<UserAddress> {
    return await this.prisma.userAddress.delete({ where: { id } });
  }
}
