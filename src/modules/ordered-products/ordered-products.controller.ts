import { Controller } from '@nestjs/common';
import { OrderedProductsService } from './ordered-products.service';

@Controller('ordered-products')
export class OrderedProductsController {
  constructor(
    private readonly orderedProductsService: OrderedProductsService,
  ) {}
}
