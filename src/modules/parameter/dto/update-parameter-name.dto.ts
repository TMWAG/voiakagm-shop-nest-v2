import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class UpdateParameterNameByIdDto {
  @ApiProperty({
    example: 1,
    description: 'Id параметра',
    nullable: false,
  })
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly id: number;

  @ApiProperty({
    example: 'Кол-во ядер',
    description: 'Название параметра',
    nullable: false,
  })
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly name: string;
}
