import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { dtoValidationError } from 'src/errors/dto.errors';

export class AddVkLinkDto {
  @ApiProperty({
    example: 'https://vk.com/miroslavpolitov',
    description: 'Ссылка на профиль ВК',
    nullable: false,
  })
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  readonly vkLink: string;
}
