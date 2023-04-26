import { ApiProperty } from '@nestjs/swagger';

export class OrderPaymentLinkEntity {
  @ApiProperty({ example: 'https://securepayments.tinkoff.ru/taaa5QXk' })
  link: string;
}
