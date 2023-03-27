import { Controller } from '@nestjs/common';
import { ProductPictureService } from './product-picture.service';

@Controller('product-picture')
export class ProductPictureController {
  constructor(private readonly productPictureService: ProductPictureService) {}
}
