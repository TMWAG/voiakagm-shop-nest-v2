import { Injectable } from '@nestjs/common';
import { CreateParameterDto } from './dto/create-parameter.dto';
import { DeleteParameterDto } from './dto/delete-parameter.dto';
import { GetAllParametersByCategoryId } from './dto/get-all-parameters-by-category-id.dto';
import { UpdateParameterCategoryByIdDto } from './dto/update-parameter-category.dto';
import { UpdateParameterNameByIdDto } from './dto/update-parameter-name.dto';
import { ParameterRepository } from './parameter.repository';

@Injectable()
export class ParameterService {
  constructor(private readonly repository: ParameterRepository) {}

  //create
  async createParameter(dto: CreateParameterDto) {
    return await this.repository.createParameter(dto.name, dto.categoryId);
  }

  //get
  async getAllParameters() {
    return await this.repository.getAllParameters();
  }

  async getAllParametersByCategoryId(dto: GetAllParametersByCategoryId) {
    return await this.repository.getAllParametersByCategoryId(dto.categoryId);
  }

  //update
  async updateParameterNameById(dto: UpdateParameterNameByIdDto) {
    return await this.repository.updateParameterNameById(dto.id, dto.name);
  }

  async updateParameterCategoryById(dto: UpdateParameterCategoryByIdDto) {
    return await this.repository.updateParameterCategoryById(
      dto.id,
      dto.categoryId,
    );
  }

  //delete
  async deleteParameterById(dto: DeleteParameterDto) {
    return await this.repository.deleteParameterById(dto.id);
  }
}
