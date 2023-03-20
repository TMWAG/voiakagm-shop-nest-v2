import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class AddTgLinkDto {
  @ApiProperty({
    example: '@TgUsername',
    description: 'Ник в Telegram',
    nullable: false,
  })
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly tgLink: string;
}
