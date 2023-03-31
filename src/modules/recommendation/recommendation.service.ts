import { Injectable, NotFoundException } from '@nestjs/common';
import { VendorService } from '../vendor/vendor.service';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { RecommendationRepository } from './recommendation.repository';
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs/promises';
import { GetAllRecommendationsByVendorId } from './dto/get-all-recommendateions-by-vendor.dto';
import { httpExceptionMessages } from 'src/errors/http-exceptions.errors';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';
import { DeleteRecommendationDto } from './dto/delete-recommendation.dto';

@Injectable()
export class RecommendationService {
  constructor(
    private readonly repository: RecommendationRepository,
    private readonly vendorService: VendorService,
  ) {}
  private readonly filepath = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'static',
    'recommendations',
  );
  //crete
  async create(dto: CreateRecommendationDto, picture: Express.Multer.File) {
    await this.vendorService.getVendorByIdOrThrowError(dto.vendorId);
    const filename = await this.writeRecommendationPicture(picture);
    return await this.repository.createRecommendation(
      dto.product,
      filename,
      dto.rating,
      dto.comment,
      dto.vendorId,
    );
  }

  //get
  async getOneOrThrowError(id: number) {
    const recommendation = await this.repository.getRecommendationById(id);
    if (!recommendation)
      throw new NotFoundException(
        httpExceptionMessages.notFound.recommendation(id),
      );
    return recommendation;
  }

  async getAll() {
    return await this.repository.getAllRecommendations();
  }

  async getAllByVendor(dto: GetAllRecommendationsByVendorId) {
    await this.vendorService.getVendorByIdOrThrowError(dto.vendorId);
    return await this.repository.getAllRecommendationsByVendorId(dto.vendorId);
  }

  async update(dto: UpdateRecommendationDto, picture?: Express.Multer.File) {
    const recommendation = await this.getOneOrThrowError(dto.id);
    if (dto.vendorId)
      await this.vendorService.getVendorByIdOrThrowError(dto.vendorId);
    let filename: string;
    if (picture) {
      this.deleteRecommendationPicture(recommendation.filename);
      filename = await this.writeRecommendationPicture(picture);
    }
    return await this.repository.updateRecommendationById(
      dto.id,
      filename,
      dto.rating,
      dto.comment,
      dto.vendorId,
    );
  }

  //delete
  async deleteRecommendation(dto: DeleteRecommendationDto) {
    const recommendation = await this.getOneOrThrowError(dto.id);
    this.deleteRecommendationPicture(recommendation.filename);
    return await this.repository.deleteRecommendationById(dto.id);
  }

  //utils
  async writeRecommendationPicture(picture: Express.Multer.File) {
    const filename = uuid.v4() + '.jpg';
    try {
      await fs.access(this.filepath);
    } catch (error) {
      await fs.mkdir(this.filepath, { recursive: true });
    }
    await fs.writeFile(path.join(this.filepath, filename), picture.buffer);
    return filename;
  }

  async deleteRecommendationPicture(filename: string): Promise<void> {
    const filepath = path.resolve(this.filepath, filename);
    fs.rm(filepath);
  }
}
