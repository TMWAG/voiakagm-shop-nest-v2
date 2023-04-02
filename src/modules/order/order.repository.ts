import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  //create
  async create(userId: number): Promise<Order> {
    return await this.prisma.order.create({ data: { userId } });
  }

  //get
  async getById(id: number): Promise<Order | undefined> {
    return await this.prisma.order.findFirst({ where: { id } });
  }

  async getCurrentByUserId(userId: number): Promise<Order | undefined> {
    return await this.prisma.order.findFirst({
      where: { userId, status: 'NOT_APPROVED' },
    });
  }

  async getAllOrdersByUserId(userId: number): Promise<Order[]> {
    return await this.prisma.order.findMany({ where: { userId } });
  }

  async getAllByDeliveryServiceId(deliveryServiceId: number): Promise<Order[]> {
    return await this.prisma.order.findMany({ where: { deliveryServiceId } });
  }

  async getAllNotApproved(): Promise<Order[]> {
    return await this.prisma.order.findMany({
      where: { status: 'NOT_APPROVED' },
    });
  }

  async getAllApproved(): Promise<Order[]> {
    return await this.prisma.order.findMany({
      where: { status: 'APPROVED' },
    });
  }

  async getAllPaid(): Promise<Order[]> {
    return await this.prisma.order.findMany({
      where: { status: 'PAID' },
    });
  }

  async getAllCompleted(): Promise<Order[]> {
    return await this.prisma.order.findMany({
      where: { status: 'COMPLETED' },
    });
  }

  async getAllSentForDelivery(): Promise<Order[]> {
    return await this.prisma.order.findMany({
      where: { status: 'SENT_FOR_DELIVERY' },
    });
  }

  async getAllDelivered(): Promise<Order[]> {
    return await this.prisma.order.findMany({
      where: { status: 'DELIVERED' },
    });
  }

  //update
  async setUserAddress(id: number, userAddressId: number): Promise<Order> {
    return await this.prisma.order.update({
      where: { id },
      data: { userAddressId },
    });
  }

  async setStatusToApproved(id: number): Promise<Order> {
    return await this.prisma.order.update({
      where: { id },
      data: { status: 'APPROVED' },
    });
  }

  async setStatusToPaid(id: number): Promise<Order> {
    return await this.prisma.order.update({
      where: { id },
      data: { status: 'PAID' },
    });
  }

  async setStatusToCompleted(id: number): Promise<Order> {
    return await this.prisma.order.update({
      where: { id },
      data: { status: 'COMPLETED' },
    });
  }

  async setStatusToSentForDelivery(id: number): Promise<Order> {
    return await this.prisma.order.update({
      where: { id },
      data: { status: 'DELIVERED' },
    });
  }

  async setTrackNo(id: number, trackNo: string): Promise<Order> {
    return await this.prisma.order.update({ where: { id }, data: { trackNo } });
  }

  async setDeliveryService(
    id: number,
    deliveryServiceId: number,
  ): Promise<Order> {
    return await this.prisma.order.update({
      where: { id },
      data: { deliveryServiceId },
    });
  }
}
