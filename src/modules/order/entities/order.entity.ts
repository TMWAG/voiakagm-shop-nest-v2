import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { VendorEntity } from 'src/modules/vendor/entities/vendor.entity';

class UserType {
  @ApiProperty({ example: 'Сергей' })
  name: string;
  @ApiProperty({ example: 'Колесников' })
  surname: string;
  @ApiProperty({ example: 'example@mail.me' })
  email: string;
  @ApiProperty({ example: '+79991112233' })
  phone: string;
  @ApiProperty({ example: 'https://vk.com/sergeyCol' })
  vkLink: string;
  @ApiProperty({ example: '@serCol' })
  tgLink: string;
}

class UserAddressType {
  @ApiProperty({
    example: 'Россия, Московская Область, Королёв, Трудовая, 12, 104',
  })
  address: string | null;
}

class DeliveryServiceType {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'Почта России' })
  name: string;
}

class PictureType {
  @ApiProperty({
    example: 'e45208dd-5d43-4b89-b6fe-374acb643089.jpg',
  })
  filename: string;
}

class Product {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'RTX 3070' })
  name: number;
  @ApiProperty()
  vendor: VendorEntity;
  @ApiProperty()
  category: CategoryEntity;
  @ApiProperty({ example: 5000000 })
  price: number;
  @ApiProperty({ example: 12 })
  discount: number | null;
  @ApiProperty({ example: false })
  used: boolean;
  @ApiProperty({ type: PictureType })
  pictures: PictureType[];
}

class OrderedProduct {
  @ApiProperty()
  product: Product;
  @ApiProperty({ example: 1 })
  amount: number;
}

export class OrderEntity {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 2 })
  userId: number;

  @ApiProperty({ example: 3 })
  userAddressId: number | null;

  @ApiProperty({ example: '2023-04-04T12:07:04.006Z' })
  createdAt: string;

  @ApiProperty({ enum: OrderStatus })
  status: OrderStatus;

  @ApiProperty({ example: 'RW01230934434EX' })
  trackNo: string | null;

  @ApiProperty({ example: 1 })
  deliveryServiceId: number | null;

  @ApiProperty({ example: true })
  crate: boolean;

  @ApiProperty()
  user: UserType;

  @ApiProperty()
  userAddress: UserAddressType | null;

  @ApiProperty()
  deliveryService: DeliveryServiceType | null;

  @ApiProperty({ type: [OrderedProduct] })
  orderedProducts: OrderedProduct[];
}
