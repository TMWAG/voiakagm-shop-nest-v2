import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, Length } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class UpdateUserPasswordDto {
  @ApiProperty({
    example: 'Qwerty_12345',
    description: 'Новый пароль пользователя',
    nullable: false,
  })
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  @Length(8, 24, { message: dtoValidationError.length.fromTo(8, 24) })
  readonly password: string;

  @ApiProperty({
    example: 'Qwerty1245@',
    description: 'Подтверждение пароля',
  })
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  @Length(8, 24, { message: dtoValidationError.length.fromTo(8, 24) })
  readonly passwordConfirmation: string;
}
