import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { IdDto } from 'src/abstract/id.dto';
import { dtoValidationError } from 'src/errors/dto.errors';

export class UpdateFeedbackDto extends IdDto {
  @ApiProperty({
    example: 'какой-то отзыв',
    description: 'Новый текст отзыва',
    nullable: false,
    required: false,
  })
  @IsOptional()
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly text: string | undefined;

  @ApiProperty({
    example: 4,
    description: 'Новая оценка товара',
    nullable: false,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  @IsIn([1, 2, 3, 4, 5], { message: dtoValidationError.length.in(1, 5) })
  readonly rating: number | undefined;
}
