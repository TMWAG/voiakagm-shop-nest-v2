import { Injectable } from '@nestjs/common';
import { VendorRepository } from './vendor.repository';

@Injectable()
export class VendorService {
  constructor(private readonly repository: VendorRepository) {}
}
