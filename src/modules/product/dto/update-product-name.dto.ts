import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { IdDto } from 'src/abstract/id.dto';
import { dtoValidationError } from 'src/errors/dto.errors';

export class UpdateProductNameDto extends IdDto {
  @ApiProperty({
    example: 'RTX 4070',
    description: 'Новое название',
    nullable: false,
  })
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly name: string;
}
