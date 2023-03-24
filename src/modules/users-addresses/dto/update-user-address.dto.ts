import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';
import { CreateUserAddressDto } from './create-user-address.dto';

export class UpdateUserAddressDto extends CreateUserAddressDto {
  @ApiProperty({
    example: 1,
    description: 'Id адреса',
    nullable: false,
  })
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly id: number;
}
