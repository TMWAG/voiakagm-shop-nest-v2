import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class CreateUserAddressDto {
  @ApiProperty({
    example: 'Россия, МО, г.Королёв, ул.Терешковой, д.12',
    description: 'Адрес',
    nullable: false,
  })
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly address: string;
}
