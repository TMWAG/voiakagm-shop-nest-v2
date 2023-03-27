import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';
import { IdDto } from 'src/abstract/id.dto';
import { dtoValidationError } from 'src/errors/dto.errors';

export class UpdateProductDescriptionDto extends IdDto {
  @ApiProperty({
    example: 'Огонь карта',
    description: 'Новое описание товара',
    nullable: false,
  })
  @Type(() => String)
  @IsInt({ message: dtoValidationError.type.string })
  readonly description: string;
}
