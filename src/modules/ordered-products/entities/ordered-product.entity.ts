import { ApiProperty } from '@nestjs/swagger';

class VendorType {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'MSI' })
  name: string;
}

class CategoryType {
  @ApiProperty({ example: 2 })
  id: number;
  @ApiProperty({ example: 'Видеокарты' })
  name: string;
}

class PictureType {
  @ApiProperty({ example: 'e45208dd-5d43-4b89-b6fe-374acb643089.jpg' })
  filename: string;
}

class ProductType {
  @ApiProperty({ example: 4 })
  id: number;
  @ApiProperty({ example: 'RTX 3070' })
  name: string;
  @ApiProperty({ example: 12400000 })
  price: number;
  @ApiProperty({ example: 12 })
  discount: number;
  @ApiProperty({ type: VendorType })
  vendor: VendorType;
  @ApiProperty({ type: CategoryType })
  category: CategoryType;
  @ApiProperty({ type: PictureType })
  picture: PictureType[];
}

export class OrderedProductEntity {
  @ApiProperty({ example: 5 })
  id: number;
  @ApiProperty({ example: 9 })
  orderId: number;
  @ApiProperty({ example: 6 })
  amount: number;
  @ApiProperty({ type: ProductType })
  product: ProductType;
}
