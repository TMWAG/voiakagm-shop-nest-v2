import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { IdDto } from 'src/abstract/id.dto';
import { dtoValidationError } from 'src/errors/dto.errors';

export class UpdateProductCharacteristicDto extends IdDto {
  @ApiProperty({
    example: 2,
    description: 'Id параметра',
    nullable: false,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly parameterId: number;

  @ApiProperty({
    example: '256-bit',
    description: 'Новое значение характеристики',
    nullable: false,
    required: false,
  })
  @IsOptional()
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly value: string;
}
