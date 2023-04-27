-- DropForeignKey
ALTER TABLE "ordered_products" DROP CONSTRAINT "ordered_products_productId_fkey";

-- AddForeignKey
ALTER TABLE "ordered_products" ADD CONSTRAINT "ordered_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
