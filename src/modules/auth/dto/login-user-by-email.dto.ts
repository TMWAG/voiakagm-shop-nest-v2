import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class LoginUserByEmailDto {
  @ApiProperty({
    example: 'example@mail.me',
    description: 'Email пользователя',
    nullable: false,
    type: String,
  })
  @Type(() => String)
  @IsEmail(undefined, { message: dtoValidationError.type.email })
  readonly email: string;

  @ApiProperty({
    example: 'Multipass_1337',
    description: 'Пароль пользователя',
    nullable: false,
    type: String,
  })
  @Type(() => String)
  readonly password: string;
}
