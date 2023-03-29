import { ApiProperty } from '@nestjs/swagger';

export class FeedbackEntity {
  @ApiProperty()
  id: number;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  productId: number;
  @ApiProperty()
  text: string;
  @ApiProperty()
  rating: number;
}
