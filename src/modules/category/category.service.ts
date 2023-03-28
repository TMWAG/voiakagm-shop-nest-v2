import { Injectable, NotFoundException } from '@nestjs/common';
import { httpExceptionMessages } from 'src/errors/http-exceptions.errors';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { UpdateCategoryNameDto } from './dto/update-category-name.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly repository: CategoryRepository) {}

  //create
  async createCategory(dto: CreateCategoryDto) {
    return await this.repository.createCategory(dto.name);
  }

  //get
  async getAllCategories() {
    return await this.repository.getAllCategories();
  }

  async getCategoryByIdOrThrowError(id: number) {
    const category = await this.repository.getCategoryById(id);
    if (!category)
      throw new NotFoundException(httpExceptionMessages.notFound.category(id));
    return category;
  }

  //update
  async updateCategoryNameById(dto: UpdateCategoryNameDto) {
    await this.getCategoryByIdOrThrowError(dto.id);
    return await this.repository.updateCategoryById(dto.id, dto.name);
  }

  //delete
  async deleteCategoryById(dto: DeleteCategoryDto) {
    await this.getCategoryByIdOrThrowError(dto.id);
    return await this.repository.deleteCategoryById(dto.id);
  }
}
