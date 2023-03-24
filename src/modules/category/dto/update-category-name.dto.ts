import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class UpdateCategoryNameDto {
  @ApiProperty({
    example: 1,
    description: 'Id категории',
    nullable: false,
  })
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly id: number;

  @ApiProperty({
    example: 'Процессоры',
    description: 'Название категории',
    nullable: false,
  })
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly name: string;
}
