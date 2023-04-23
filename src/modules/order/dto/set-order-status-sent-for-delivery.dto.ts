import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { IdDto } from 'src/abstract/id.dto';
import { dtoValidationError } from 'src/errors/dto.errors';

export class SetOrderStatusSentForDeliveryDto extends IdDto {
  @ApiProperty({
    example: 'RW45343341903DS',
    description: 'Трек-номер',
    nullable: false,
  })
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly trackNo: string;
}
