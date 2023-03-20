import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty({
    example: 'Тимофей',
    description: 'Имя пользователя',
    nullable: false,
  })
  name: string;

  @ApiProperty({
    example: 'Иванов',
    description: 'Фамилия пользователя',
    nullable: false,
  })
  surname: string;

  @ApiProperty({
    example: '+79991112233',
    description: 'Телефон пользователя',
    nullable: false,
  })
  phone: string;

  @ApiProperty({
    example: 'example@mail.ru',
    description: 'Электронная почта пользователя',
    nullable: false,
  })
  email: string;

  @ApiProperty({
    example: 'Qwerty_1234',
    description: 'Пароль пользователя',
    nullable: false,
  })
  password: string;
}
