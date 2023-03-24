import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class DeleteCategoryDto {
  @ApiProperty({
    example: 1,
    description: 'Id категории',
    nullable: false,
  })
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.string })
  readonly id: number;
}
