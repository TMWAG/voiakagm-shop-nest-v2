import { Injectable } from '@nestjs/common';
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

  //update
  async updateCategoryNameById(dto: UpdateCategoryNameDto) {
    return await this.repository.updateCategoryById(dto.id, dto.name);
  }

  //delete
  async deleteCategoryById(dto: DeleteCategoryDto) {
    return await this.repository.deleteCategoryById(dto.id);
  }
}
