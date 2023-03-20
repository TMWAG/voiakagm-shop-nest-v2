import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Length } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'MultiPass',
    description: 'Пароль',
  })
  @Type(() => String)
  @Length(8, 24, { message: dtoValidationError.length.fromTo(8, 24) })
  readonly password: string;

  @ApiProperty({
    example: 'MultiPass1',
    description: 'Подтверждение пароля',
  })
  @Type(() => String)
  @Length(8, 24, { message: dtoValidationError.length.fromTo(8, 24) })
  readonly passwordConfirmation: string;
}
