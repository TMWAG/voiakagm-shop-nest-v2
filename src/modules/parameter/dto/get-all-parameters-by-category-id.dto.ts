import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class GetAllParametersByCategoryId {
  @ApiProperty({
    example: 2,
    description: 'Id категории',
    nullable: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt({ message: dtoValidationError.type.int })
  readonly categoryId: number;
}
