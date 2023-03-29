import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class CreateProductCharacteristicDto {
  @ApiProperty({
    example: 2,
    description: 'Id параметра',
    nullable: false,
  })
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly parameterId: number;

  @ApiProperty({
    example: 3,
    description: 'Id товара',
    nullable: false,
  })
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly productId: number;

  @ApiProperty({
    example: '256-bit',
    description: 'Значение характеристики',
    nullable: false,
  })
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly value: string;
}
