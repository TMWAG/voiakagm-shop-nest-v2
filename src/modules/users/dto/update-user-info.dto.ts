import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class UpdateUserInfoDto {
  @ApiProperty({
    example: 'Тимофей',
    description: 'Имя',
    nullable: false,
    required: false,
  })
  @IsOptional()
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly name: string;

  @ApiProperty({
    example: 'Колесников',
    description: 'Фамилия',
    nullable: false,
    required: false,
  })
  @IsOptional()
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly surname: string;

  @ApiProperty({
    example: '+79991112233',
    description: 'Телефон',
    nullable: false,
    required: false,
  })
  @IsOptional()
  @Type(() => String)
  @IsPhoneNumber(undefined, { message: dtoValidationError.type.phone })
  readonly phone: string;
}
