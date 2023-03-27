import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class CreateProductDto {
  @ApiProperty({
    example: 'Ryzen 7 3700X',
    description: 'Название товара',
    nullable: false,
  })
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly name: string;

  @ApiProperty({
    example: 2,
    description: 'Id производителя',
    nullable: false,
  })
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly vendorId: number;

  @ApiProperty({
    example: 3,
    description: 'Id категории',
    nullable: false,
  })
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly categoryId: number;

  @ApiProperty({
    example: 1320000,
    description: 'Цена в копейках',
    nullable: false,
  })
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly price: number;

  @ApiProperty({
    example: 'Зверь камень',
    description: 'Описание товара',
    nullable: false,
  })
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly description: string;

  @ApiProperty({
    example: false,
    description: 'Товар б/у или нет',
    nullable: false,
  })
  @Type(() => Boolean)
  @IsBoolean({ message: dtoValidationError.type.bool })
  readonly used: boolean;

  @ApiProperty({
    example: 13,
    description: 'Кол-во товара',
    nullable: true,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly amount: number | undefined;
}
