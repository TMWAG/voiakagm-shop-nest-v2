import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { VendorEntity } from 'src/modules/vendor/entities/vendor.entity';

type UserType = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  vkLink: string;
  tgLink: string;
};

type UserAddressType = {
  address: string;
};

type DeliveryServiceType = {
  address: string;
};

type PictureType = {
  id: number;
  productId: number;
  filename: string;
};

type Product = {
  id: number;
  name: number;
  vendor: VendorEntity;
  category: CategoryEntity;
  price: number;
  discount: number | null;
  used: boolean;
  amount: number;
  pictures: PictureType[];
};

type OrderedProduct = {
  product: Product;
  amount: number;
};

export class OrderEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  userAddressId: number | null;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  status: OrderStatus;

  @ApiProperty()
  trackNo: string | null;

  @ApiProperty()
  deliveryServiceId: number | null;

  @ApiProperty()
  crate: boolean;

  @ApiProperty()
  user: UserType;

  @ApiProperty()
  userAddress: UserAddressType | null;

  @ApiProperty()
  deliveryService: DeliveryServiceType | null;

  @ApiProperty()
  orderedProducts: OrderedProduct[];
}
