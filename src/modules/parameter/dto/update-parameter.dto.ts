import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { IdDto } from 'src/abstract/id.dto';
import { dtoValidationError } from 'src/errors/dto.errors';

export class UpdateParameterDto extends IdDto {
  @ApiProperty({
    example: 'Кол-во видеопамяти',
    description: 'Название параметра',
    nullable: false,
    required: false,
  })
  @IsOptional()
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly name: string;

  @ApiProperty({
    example: 3,
    description: 'Id категории',
    nullable: false,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly categoryId: number;
}
