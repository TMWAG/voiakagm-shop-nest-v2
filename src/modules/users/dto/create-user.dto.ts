import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty({
    example: 'Тимофей',
    description: 'Имя пользователя',
  })
  name: string;

  @ApiProperty({
    example: 'Иванов',
    description: 'Фамилия пользователя',
  })
  surname: string;

  @ApiProperty({
    example: '+79991112233',
    description: 'Телефон пользователя',
  })
  phone: string;

  @ApiProperty({
    example: 'example@mail.ru',
    description: 'Электронная почта пользователя',
  })
  email: string;

  @ApiProperty({
    example: 'Qwerty_1234',
    description: 'Пароль пользователя',
  })
  password: string;
}
