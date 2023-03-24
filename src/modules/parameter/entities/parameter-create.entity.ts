import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';

export class ParameterCreateEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  category: CategoryEntity;
}
