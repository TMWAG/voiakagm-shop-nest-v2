import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';
import { CreateVendorDto } from './create-vendor.dto';

export class UpdateVendorNameDto extends CreateVendorDto {
  @ApiProperty({
    example: 1,
    description: 'Id производителя',
    nullable: false,
  })
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly id: number;
}
