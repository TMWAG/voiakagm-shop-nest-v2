import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsString } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class CreateRecommendationDto {
  @ApiProperty({
    example: 'RTX 3070',
    description: 'Название модели',
    nullable: false,
  })
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly product: string;

  @ApiProperty({
    example: 4,
    description: 'Оценка исполнения',
    nullable: false,
  })
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  @IsIn([1, 2, 3, 4, 5], { message: dtoValidationError.length.in(1, 5) })
  readonly rating: number;

  @ApiProperty({
    example: 'Хорошее исполнение, отличное охлаждение',
    description: 'Комментарий',
    nullable: false,
  })
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly comment: string;

  @ApiProperty({
    example: 1,
    description: 'Id производителя',
    nullable: false,
  })
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly vendorId: number;
}
