import { Injectable } from '@nestjs/common';
import { ParameterRepository } from './parameter.repository';

@Injectable()
export class ParameterService {
  constructor(private readonly repository: ParameterRepository) {}
}
