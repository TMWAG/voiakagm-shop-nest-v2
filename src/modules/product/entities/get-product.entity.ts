import { ApiProperty } from '@nestjs/swagger';

export class GetProductEntity {
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
  discount: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  sold: number;

  @ApiProperty()
  used: boolean;

  @ApiProperty()
  category: { name: string };

  @ApiProperty()
  vendor: { name: string };

  @ApiProperty()
  pictures: [];
}
