import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { IdDto } from 'src/abstract/id.dto';
import { dtoValidationError } from 'src/errors/dto.errors';

export class UpdateProductDto extends IdDto {
  @ApiProperty({
    example: 'RX 580',
    description: 'Название товара',
    nullable: false,
    required: false,
  })
  @IsOptional()
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly name: string;

  @ApiProperty({
    example: 1,
    description: 'Id категории',
    nullable: false,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly categoryId: number;

  @ApiProperty({
    example: 2,
    description: 'Id производителя',
    nullable: false,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly vendorId: number;

  @ApiProperty({
    example: 'Карта огонь',
    description: 'Описание товара',
    nullable: false,
    required: false,
  })
  @IsOptional()
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly description: string;

  @ApiProperty({
    example: 1000000,
    description: 'Цена',
    nullable: false,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly price: number;

  @ApiProperty({
    example: '13',
    description: 'Скидка',
    nullable: false,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly discount: number;

  @ApiProperty({
    example: 23,
    description: 'Кол-во товара',
    nullable: false,
    required: false,
  })
  @IsOptional()
  @IsInt({ message: dtoValidationError.type.int })
  readonly amount: number;
}
