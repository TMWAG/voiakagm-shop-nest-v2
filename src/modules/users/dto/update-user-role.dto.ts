import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsInt } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class UpdateUserRoleDto {
  @ApiProperty({
    description: 'Id пользователя',
    example: 1,
    nullable: false,
  })
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly id: number;

  @ApiProperty({
    description: 'Новая роль пользователя',
    example: Role.USER,
    enum: Role,
    nullable: false,
  })
  @IsEnum(Role)
  readonly role: Role;
}
