import { Injectable } from '@nestjs/common';
import { ProductCharacteristicRepository } from './product-characteristic.repository';

@Injectable()
export class ProductCharacteristicService {
  constructor(private readonly repository: ProductCharacteristicRepository) {}
}
