import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class PaginationDto {
  @ApiProperty({
    example: 1,
    description: 'Номер страницы',
    nullable: true,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly page: number | undefined;

  @ApiProperty({
    example: 12,
    description: 'Кол-во товаров на странице',
    nullable: true,
    default: 12,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly limit: number | undefined;
}
