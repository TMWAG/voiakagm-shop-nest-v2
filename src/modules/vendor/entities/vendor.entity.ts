import { ApiProperty } from '@nestjs/swagger';

export class VendorEntity {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'MSI' })
  name: string;
}
