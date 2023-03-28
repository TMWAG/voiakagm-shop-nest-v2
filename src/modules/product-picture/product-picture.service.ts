import { Injectable } from '@nestjs/common';
import { CreateProductPictureDto } from './dto/create-product-picture.dto';
import { ProductPictureRepository } from './product-picture.repository';
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs/promises';
import { DeleteProductPictureDto } from './dto/delete-product-picture.dto';

@Injectable()
export class ProductPictureService {
  constructor(private readonly repository: ProductPictureRepository) {}

  async addProductPictureByProductId(
    dto: CreateProductPictureDto,
    picture: Express.Multer.File,
  ) {
    const filename = uuid.v4() + '.jpg';
    const filepath = path.resolve(
      __dirname,
      '..',
      '..',
      'static',
      String(dto.productId),
    );
    try {
      await fs.access(filepath);
    } catch (error) {
      fs.mkdir(filepath, { recursive: true });
    }
    fs.writeFile(path.join(filepath, filename), picture.buffer);
    return await this.repository.createProductPicture(dto.productId, filename);
  }

  async deleteProductPictureById(dto: DeleteProductPictureDto) {
    const productPictureData = await this.repository.deleteProductPictureById(
      dto.id,
    );
    const filepath = path.resolve(
      __dirname,
      '..',
      'static',
      String(productPictureData.productId),
      productPictureData.filename,
    );
    fs.rm(filepath);
    return productPictureData;
  }
}
