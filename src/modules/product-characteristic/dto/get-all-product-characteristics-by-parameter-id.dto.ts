import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class GetAllProductCharacteristicsByParameterDto {
  @ApiProperty({
    example: 2,
    description: 'Id параметра',
    nullable: false,
  })
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly parameterId: number;
}
