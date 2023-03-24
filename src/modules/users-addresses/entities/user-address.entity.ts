import { ApiProperty } from '@nestjs/swagger';

export class UserAddressEntity {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly userId: number;
  @ApiProperty()
  readonly address: string;
}
