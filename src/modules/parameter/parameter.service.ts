import { Injectable, NotFoundException } from '@nestjs/common';
import { httpExceptionMessages } from 'src/errors/http-exceptions.errors';
import { CreateParameterDto } from './dto/create-parameter.dto';
import { DeleteParameterDto } from './dto/delete-parameter.dto';
import { GetAllParametersByCategoryId } from './dto/get-all-parameters-by-category-id.dto';
import { ParameterRepository } from './parameter.repository';
import { CategoryService } from '../category/category.service';
import { UpdateParameterDto } from './dto/update-parameter.dto';

@Injectable()
export class ParameterService {
  constructor(
    private readonly repository: ParameterRepository,
    private readonly categoryService: CategoryService,
  ) {}

  //create
  async createParameter(dto: CreateParameterDto) {
    await this.categoryService.getCategoryByIdOrThrowError(dto.categoryId);
    return await this.repository.createParameter(dto.name, dto.categoryId);
  }

  //get
  async getAllParameters() {
    return await this.repository.getAllParameters();
  }

  async getParameterByIdOrThrowError(id: number) {
    const parameter = await this.repository.getParameterById(id);
    if (!parameter)
      throw new NotFoundException(httpExceptionMessages.notFound.parameter(id));
    return parameter;
  }

  async getAllParametersByCategoryId(dto: GetAllParametersByCategoryId) {
    await this.categoryService.getCategoryByIdOrThrowError(dto.categoryId);
    return await this.repository.getAllParametersByCategoryId(dto.categoryId);
  }

  //update
  async updateParameterById(dto: UpdateParameterDto) {
    await this.getParameterByIdOrThrowError(dto.id);
    if (dto.categoryId)
      await this.categoryService.getCategoryByIdOrThrowError(dto.categoryId);
    return await this.repository.updateParameterById(
      dto.id,
      dto.name,
      dto.categoryId,
    );
  }

  //delete
  async deleteParameterById(dto: DeleteParameterDto) {
    await this.getParameterByIdOrThrowError(dto.id);
    return await this.repository.deleteParameterById(dto.id);
  }
}
