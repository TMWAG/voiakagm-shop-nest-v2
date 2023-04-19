import { ForbiddenException, Injectable } from '@nestjs/common';
import { PurchasedProductsRepository } from './purchased-products.repository';

@Injectable()
export class PurchasedProductsService {
  constructor(private readonly repository: PurchasedProductsRepository) {}

  async add(userId: number, productId: number) {
    return this.repository.create(userId, productId);
  }

  async checkUserPurchaseOrThrowError(userId: number, productId: number) {
    const userProducts = await this.repository.getProductsByUserId(userId);
    const isPurchased = userProducts.some(
      (product) => product.productId === productId,
    );
    if (!isPurchased)
      throw new ForbiddenException('Данный товар не куплен вами');
  }
}
