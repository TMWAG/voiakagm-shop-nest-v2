import { ApiProperty } from '@nestjs/swagger';

export class ProductCharacteristicEntity {
  @ApiProperty()
  id: number;
  @ApiProperty()
  parameterId: number;
  @ApiProperty()
  productId: number;
  @ApiProperty()
  value: string;
}
