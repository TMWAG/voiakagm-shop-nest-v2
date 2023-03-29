import { Injectable } from '@nestjs/common';
import { ProductParameterRepository } from './product-parameter.repository';

@Injectable()
export class ProductParameterService {
  constructor(private readonly repository: ProductParameterRepository) {}
}
