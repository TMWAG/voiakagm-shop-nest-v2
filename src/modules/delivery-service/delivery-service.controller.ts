import { Controller } from '@nestjs/common';
import { DeliveryServiceService } from './delivery-service.service';

@Controller('delivery-service')
export class DeliveryServiceController {
  constructor(
    private readonly deliveryServiceService: DeliveryServiceService,
  ) {}
}
