import { Controller } from '@nestjs/common';
import { ProductCharacteristicService } from './product-characteristic.service';

@Controller('product-characteristic')
export class ProductCharacteristicController {
  constructor(
    private readonly productParameterService: ProductCharacteristicService,
  ) {}
}
