import { Injectable, NotFoundException } from '@nestjs/common';
import { httpExceptionMessages } from 'src/errors/http-exceptions.errors';
import { DeliveryServiceRepository } from './delivery-service.repository';
import { CreateDeliveryServiceDto } from './dto/create-delivery-service.dto';
import { DeleteDeliveryServiceDto } from './dto/delete-delivery-service.dto';
import { UpdateDeliveryServiceDto } from './dto/update-delivery-service.dto';

@Injectable()
export class DeliveryServiceService {
  constructor(private readonly repository: DeliveryServiceRepository) {}

  //create
  async create(dto: CreateDeliveryServiceDto) {
    return await this.repository.create(dto.name);
  }

  //get
  async getOneOrThrowError(id: number) {
    const deliveryService = await this.repository.getOneById(id);
    if (!deliveryService)
      throw new NotFoundException(
        httpExceptionMessages.notFound.deliveryService(id),
      );
    return deliveryService;
  }

  async getAll() {
    return await this.repository.getAll();
  }

  //update
  async update(dto: UpdateDeliveryServiceDto) {
    await this.getOneOrThrowError(dto.id);
    return await this.repository.update(dto.id, dto.name);
  }

  //delete
  async delete(dto: DeleteDeliveryServiceDto) {
    await this.getOneOrThrowError(dto.id);
    return await this.repository.delete(dto.id);
  }
}
