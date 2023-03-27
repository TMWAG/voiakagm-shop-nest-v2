import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { VendorEntity } from 'src/modules/vendor/entities/vendor.entity';

export class CreateProductEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  vendorId: number;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  discount: number | null;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  sold: number;

  @ApiProperty()
  used: boolean;

  @ApiProperty()
  category: CategoryEntity;

  @ApiProperty()
  vendor: VendorEntity;
}
