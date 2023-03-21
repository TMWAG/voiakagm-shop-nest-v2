import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class RegisterUserDto {
  @ApiProperty({
    example: 'Семён',
    description: 'Имя',
  })
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly name: string;

  @ApiProperty({
    example: 'Политов',
    description: 'Фамилия',
  })
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly surname: string;

  @ApiProperty({
    example: '+79154567453',
    description: 'Телефон для логина',
  })
  @Type(() => String)
  @IsPhoneNumber(undefined, { message: dtoValidationError.type.phone })
  readonly phone: string;

  @ApiProperty({
    example: 'uname@mail.com',
    description: 'Почта для логина',
    required: false,
  })
  @Type(() => String)
  @IsEmail({}, { message: dtoValidationError.type.email })
  readonly email: string;

  @ApiProperty({
    example: 'MultiPass_1337',
    description: 'Пароль',
  })
  @Type(() => String)
  @Length(8, 24, { message: dtoValidationError.length.fromTo(8, 24) })
  @IsString({ message: dtoValidationError.type.string })
  readonly password: string;
}
