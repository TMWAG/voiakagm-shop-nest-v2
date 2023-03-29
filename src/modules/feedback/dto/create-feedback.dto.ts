import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsString } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class CreateFeedbackDto {
  @ApiProperty({
    example: 1,
    description: 'Id товара',
    nullable: false,
  })
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly productId: number;

  @ApiProperty({
    example: 'Хорошая карта',
    description: 'Текст отзыва',
    nullable: false,
  })
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly text: string;

  @ApiProperty({
    example: 5,
    description: 'Оценка товара',
    nullable: false,
    enum: [1, 2, 3, 4, 5],
  })
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  @IsIn([1, 2, 3, 4, 5], { message: dtoValidationError.length.in(1, 5) })
  readonly rating: 1 | 2 | 3 | 4 | 5;
}
