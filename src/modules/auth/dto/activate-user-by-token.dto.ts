import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class ActivateUserByTokenDto {
  @ApiProperty({
    example: 'cfbe81a7-d0d1-4842-8e2d-4c4a7a6d9564',
    description: 'Токен активации',
  })
  @Type(() => String)
  @IsUUID(4, { message: dtoValidationError.type.uuidV4 })
  readonly token: string;
}
