import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class RequestRestoreByEmailDto {
  @ApiProperty({
    example: 'example@mail.ru',
    description: 'Почта аккаунта восстановление доступа к которому требуется',
  })
  @Type(() => String)
  @IsEmail(undefined, { message: dtoValidationError.type.email })
  readonly email: string;
}
