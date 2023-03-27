import { Injectable } from '@nestjs/common';
import { ProductPictureRepository } from './product-picture.repository';

@Injectable()
export class ProductPictureService {
  constructor(private readonly repository: ProductPictureRepository) {}
}
