import { Injectable, NotFoundException } from '@nestjs/common';
import { httpExceptionMessages } from 'src/errors/http-exceptions.errors';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { UpdateCategoryNameDto } from './dto/update-category-name.dto';
import { randomUUID } from 'crypto';
import { resolve, join } from 'path';
import * as fs from 'fs/promises';

@Injectable()
export class CategoryService {
  constructor(private readonly repository: CategoryRepository) {}

  private readonly categoryPicturesFolder = resolve(
    __dirname,
    '..',
    '..',
    '..',
    'static',
    'category',
  );

  //create
  async createCategory(dto: CreateCategoryDto, picture: Express.Multer.File) {
    const filename = await this.createCategoryPicture(picture);
    return await this.repository.createCategory(dto.name, filename);
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
  async updateCategory(
    dto: UpdateCategoryNameDto,
    picture?: Express.Multer.File,
  ) {
    const category = await this.getCategoryByIdOrThrowError(dto.id);
    let filename: undefined | string;
    if (picture) {
      this.deleteCategoryPicture(category.id);
      filename = await this.createCategoryPicture(picture);
    }
    return await this.repository.updateCategoryById(dto.id, dto.name, filename);
  }

  //delete
  async deleteCategoryById(dto: DeleteCategoryDto) {
    const category = await this.getCategoryByIdOrThrowError(dto.id);
    if (category.picture) this.deleteCategoryPicture(category.id);
    return await this.repository.deleteCategoryById(dto.id);
  }

  async createCategoryPicture(picture: Express.Multer.File) {
    const filename = randomUUID() + '.' + picture.originalname.split('.').pop();
    try {
      await fs.access(this.categoryPicturesFolder);
    } catch (error) {
      await fs.mkdir(this.categoryPicturesFolder, { recursive: true });
    }
    await fs.writeFile(
      join(this.categoryPicturesFolder, filename),
      picture.buffer,
    );
    return filename;
  }

  async deleteCategoryPicture(categoryId: number) {
    const category = await this.getCategoryByIdOrThrowError(categoryId);
    fs.rm(resolve(this.categoryPicturesFolder, category.picture));
    return await this.repository.deleteCategoryPictureById(categoryId);
  }
}
