import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus, Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/abstract/pagination.dto';
import { dtoValidationError } from 'src/errors/dto.errors';

const statuses: string[] = [
  OrderStatus.NOT_APPROVED,
  OrderStatus.APPROVED,
  OrderStatus.PAID,
  OrderStatus.COMPLETED,
  OrderStatus.SENT_FOR_DELIVERY,
  OrderStatus.DELIVERED,
];

export class GetAllOrdersDto extends PaginationDto {
  @ApiProperty({
    example: statuses[1],
    description: 'статус заказов',
    nullable: true,
    default: undefined,
    enum: statuses,
    required: false,
  })
  @IsOptional()
  @Type(() => String)
  @IsString({ message: dtoValidationError.type.string })
  @IsIn(statuses, { message: dtoValidationError.type.partOfEnum(statuses) })
  readonly status: Partial<Prisma.EnumOrderStatusFilter>;

  @ApiProperty({
    example: 1,
    description: 'Id пользователя',
    nullable: true,
    default: undefined,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly userId: number;

  @ApiProperty({
    example: 3,
    description: 'Id службы доставки',
    nullable: true,
    default: undefined,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: dtoValidationError.type.int })
  readonly deliveryServiceId: number;
}
