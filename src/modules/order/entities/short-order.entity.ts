import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';

export class ShortOrderEntity {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 3 })
  userId: number;

  @ApiProperty({ example: 4 })
  userAddressId: number | null;

  @ApiProperty({ example: '2023-04-04T12:07:04.006Z' })
  createdAt: string;

  @ApiProperty({ example: OrderStatus.PAID })
  status: string;

  @ApiProperty({ example: 'RW5454322WX' })
  trackNo: string;

  @ApiProperty({ example: 3 })
  deliveryServiceId: number;

  @ApiProperty({ example: true })
  crate: boolean;
}
