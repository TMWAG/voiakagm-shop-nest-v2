import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export abstract class IdDto {
  @ApiProperty({
    example: 1,
    description: 'Id продукта',
    nullable: false,
  })
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly id: number;
}
