import { ApiProperty } from '@nestjs/swagger';

export class DeleteOrderedProductEntity {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 213 })
  orderId: number;
  @ApiProperty({ example: 43 })
  productId: number;
  @ApiProperty({ example: 2 })
  amount: number;
}
