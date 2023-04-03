import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class CreateOrderedProductDto {
  @ApiProperty({
    example: 1,
    description: 'Id товара',
    nullable: false,
  })
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly productId: number;

  @ApiProperty({
    example: 2,
    description: 'Кол-во товара',
    nullable: false,
  })
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly amount: number;
}
