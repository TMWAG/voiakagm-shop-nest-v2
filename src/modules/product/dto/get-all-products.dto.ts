import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';
import { PaginationDto } from '../../../abstract/pagination.dto';

const sortTypes: string[] = [
  'price-asc',
  'price-desc',
  'sold-asc',
  'sold-desc',
];

export class GetAllProductsDto extends PaginationDto {
  @ApiProperty({
    example: sortTypes[0],
    description: 'тип сортировки',
    nullable: true,
    default: sortTypes[0],
    enum: sortTypes,
  })
  @IsOptional()
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  @IsIn(sortTypes, { message: dtoValidationError.type.partOfEnum(sortTypes) })
  readonly sort: string | undefined;

  @ApiProperty({
    example: true,
    description: 'Состояние товара',
    nullable: true,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean({ message: dtoValidationError.type.bool })
  readonly used: boolean | undefined;

  @ApiProperty({
    example: true,
    description: 'Только товары по скидке',
    nullable: true,
    default: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean({ message: dtoValidationError.type.bool })
  readonly discounted: boolean | undefined;

  @ApiProperty({
    example: 30000,
    description: 'Минимальная цена',
    nullable: true,
    default: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly minPrice: number | undefined;

  @ApiProperty({
    example: 2300000,
    description: 'Максимальная цена',
    nullable: true,
    default: undefined,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly maxPrice: number | undefined;

  @ApiProperty({
    example: 2,
    description: 'Id производителя',
    nullable: true,
    default: undefined,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly vendorId: number;

  @ApiProperty({
    example: 1,
    description: 'Id категории',
    nullable: true,
    default: undefined,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly categoryId: number;
}
