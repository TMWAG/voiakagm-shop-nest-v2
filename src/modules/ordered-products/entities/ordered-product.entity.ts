import { ApiProperty } from '@nestjs/swagger';

type VendorType = {
  id: number;
  name: string;
};
type CategoryType = {
  id: number;
  name: string;
};
type PictureType = {
  id: number;
  productId: number;
  filename: string;
};
type ProductType = {
  id: number;
  name: string;
  price: number;
  vendor: VendorType;
  category: CategoryType;
  picture: PictureType[];
};

export class OrderedProductEntity {
  @ApiProperty()
  id: number;
  @ApiProperty()
  orderId: number;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  product: ProductType;
}
