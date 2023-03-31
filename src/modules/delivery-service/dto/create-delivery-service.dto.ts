import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class CreateDeliveryServiceDto {
  @ApiProperty({
    example: 'СДЭК',
    description: 'Название службы доставки',
    nullable: false,
  })
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly name: string;
}
