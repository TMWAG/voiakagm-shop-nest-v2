import { Injectable } from '@nestjs/common';
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

  //update
  async updateVendorName(dto: UpdateVendorNameDto) {
    return await this.repository.updateVendorNameById(dto.id, dto.name);
  }

  //delete
  async deleteVendor(dto: DeleteVendorDto) {
    return await this.repository.deleteVendorById(dto.id);
  }
}
