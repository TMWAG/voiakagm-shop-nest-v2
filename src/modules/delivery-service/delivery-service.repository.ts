import { Injectable } from '@nestjs/common';
import { DeliveryService } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class DeliveryServiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  //create
  async create(name: string): Promise<DeliveryService> {
    return await this.prisma.deliveryService.create({ data: { name } });
  }

  //get
  async getOneById(id: number): Promise<DeliveryService | undefined> {
    return await this.prisma.deliveryService.findFirst({ where: { id } });
  }

  async getAll(): Promise<DeliveryService[]> {
    return await this.prisma.deliveryService.findMany();
  }

  //update
  async update(id: number, name: string): Promise<DeliveryService> {
    return await this.prisma.deliveryService.update({
      where: { id },
      data: { name },
    });
  }

  //delete
  async delete(id: number): Promise<DeliveryService> {
    return await this.prisma.deliveryService.delete({ where: { id } });
  }
}
