import { Controller } from '@nestjs/common';
import { ParameterService } from './parameter.service';

@Controller('parameter')
export class ParameterController {
  constructor(private readonly parameterService: ParameterService) {}
}
