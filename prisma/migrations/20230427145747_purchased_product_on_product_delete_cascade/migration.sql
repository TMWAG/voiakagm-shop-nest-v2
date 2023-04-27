-- DropForeignKey
ALTER TABLE "purchased_products" DROP CONSTRAINT "purchased_products_productId_fkey";

-- AddForeignKey
ALTER TABLE "purchased_products" ADD CONSTRAINT "purchased_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
