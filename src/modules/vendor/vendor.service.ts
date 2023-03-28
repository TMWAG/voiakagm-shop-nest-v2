import { Injectable, NotFoundException } from '@nestjs/common';
import { httpExceptionMessages } from 'src/errors/http-exceptions.errors';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { DeleteVendorDto } from './dto/delete-vendor.dto';
import { UpdateVendorNameDto } from './dto/update-vendor-name.dto';
import { VendorRepository } from './vendor.repository';

@Injectable()
export class VendorService {
  constructor(private readonly repository: VendorRepository) {}

  //create
  async createVendor(dto: CreateVendorDto) {
    return await this.repository.createVendor(dto.name);
  }

  //get
  async getAllVendors() {
    return await this.repository.getAllVendors();
  }

  async getVendorByIdOrThrowError(id: number) {
    const vendor = await this.repository.getVendorById(id);
    if (!vendor)
      throw new NotFoundException(httpExceptionMessages.notFound.vendor(id));
    return vendor;
  }

  //update
  async updateVendorName(dto: UpdateVendorNameDto) {
    await this.getVendorByIdOrThrowError(dto.id);
    return await this.repository.updateVendorNameById(dto.id, dto.name);
  }

  //delete
  async deleteVendor(dto: DeleteVendorDto) {
    await this.getVendorByIdOrThrowError(dto.id);
    return await this.repository.deleteVendorById(dto.id);
  }
}
