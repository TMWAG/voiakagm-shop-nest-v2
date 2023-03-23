import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, Length } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class UpdateUserSurnameDto {
  @ApiProperty({
    description: 'Фамилия пользователя',
    example: 'Нечаев',
    nullable: false,
  })
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  @Length(2, 24, { message: dtoValidationError.length.fromTo(2, 24) })
  readonly surname: string;
}
