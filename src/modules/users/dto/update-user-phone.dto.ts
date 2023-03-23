import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsPhoneNumber } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class UpdateUserPhoneDto {
  @ApiProperty({
    description: 'телефон пользователя',
    example: '+79991112233',
    nullable: false,
  })
  @Type(() => String)
  @IsPhoneNumber(undefined, { message: dtoValidationError.type.phone })
  readonly phone: string;
}
