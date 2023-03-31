import { ApiProperty } from '@nestjs/swagger';

export class DeliveryServiceEntity {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
