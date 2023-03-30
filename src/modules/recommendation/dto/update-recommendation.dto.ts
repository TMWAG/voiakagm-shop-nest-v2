import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { IdDto } from 'src/abstract/id.dto';
import { dtoValidationError } from 'src/errors/dto.errors';

export class UpdateRecommendationDto extends IdDto {
  @ApiProperty({
    example: 'RX 580',
    description: 'Новое название модели',
    nullable: false,
    required: false,
  })
  @IsOptional()
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly product: string;

  @ApiProperty({
    example: 5,
    description: 'Новая оценка исполнения',
    nullable: false,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  @IsIn([1, 2, 3, 4, 5], { message: dtoValidationError.length.in(1, 5) })
  readonly rating: number;

  @ApiProperty({
    example: 'Неплохое исполнение',
    description: 'Новый текст комментария',
    nullable: false,
    required: false,
  })
  @IsOptional()
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly comment: string;

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
}
