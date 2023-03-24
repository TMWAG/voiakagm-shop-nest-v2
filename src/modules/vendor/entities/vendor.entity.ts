import { ApiProperty } from '@nestjs/swagger';

export class VendorEntity {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
