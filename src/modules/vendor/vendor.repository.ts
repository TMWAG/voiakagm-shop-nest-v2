import { Injectable } from '@nestjs/common';
import { Vendor } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class VendorRepository {
  constructor(private readonly prisma: PrismaService) {}

  //create
  async createVendor(name: string): Promise<Vendor> {
    return this.prisma.vendor.create({ data: { name } });
  }

  //get
  async getAllVendors(): Promise<Vendor[]> {
    return this.prisma.vendor.findMany();
  }

  async getVendorById(id: number): Promise<Vendor | undefined> {
    return this.prisma.vendor.findFirst({ where: { id } });
  }

  //update
  async updateVendorNameById(id: number, name: string): Promise<Vendor> {
    return this.prisma.vendor.update({ where: { id }, data: { name } });
  }

  //delete
  async deleteVendorById(id: number): Promise<Vendor> {
    return this.prisma.vendor.delete({ where: { id } });
  }
}
