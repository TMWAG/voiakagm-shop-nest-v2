import { ApiProperty } from '@nestjs/swagger';
import { VendorEntity } from 'src/modules/vendor/entities/vendor.entity';

export class RecommendationEntity {
  @ApiProperty()
  id: number;
  @ApiProperty()
  product: string;
  @ApiProperty()
  filename: string;
  @ApiProperty()
  rating: number;
  @ApiProperty()
  comment: string;
  @ApiProperty()
  vendorId: number;
  @ApiProperty()
  vendor: VendorEntity;
}
