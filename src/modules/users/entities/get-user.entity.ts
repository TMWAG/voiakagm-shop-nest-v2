import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class GetUser {
  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  tgLink: string;

  @ApiProperty()
  vkLink: string;
}
