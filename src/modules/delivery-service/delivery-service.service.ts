import { Injectable } from '@nestjs/common';
import { DeliveryServiceRepository } from './delivery-service.repository';

@Injectable()
export class DeliveryServiceService {
  constructor(private readonly repository: DeliveryServiceRepository) {}
}
