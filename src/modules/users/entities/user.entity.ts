import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  tgLink: string;

  @ApiProperty()
  vkLink: string;
}
