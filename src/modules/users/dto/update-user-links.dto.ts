import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class UpdateUserLinksDto {
  @ApiProperty({
    example: '@TgUsername',
    description: 'Ник в Telegram',
    nullable: false,
  })
  @IsOptional()
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly tgLink: string;

  @ApiProperty({
    example: 'https://vk.com/miroslavpolitov',
    description: 'Ссылка на профиль ВК',
    nullable: false,
  })
  @IsOptional()
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly vkLink: string;
}
