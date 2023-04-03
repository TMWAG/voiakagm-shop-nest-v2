import { Injectable } from '@nestjs/common';
import { OrderedProductsRepository } from './ordered-products.repository';

@Injectable()
export class OrderedProductsService {
  constructor(private readonly repository: OrderedProductsRepository) {}
}
