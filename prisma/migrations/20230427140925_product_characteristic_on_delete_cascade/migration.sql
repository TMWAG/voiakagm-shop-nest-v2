-- DropForeignKey
ALTER TABLE "product_characteristics" DROP CONSTRAINT "product_characteristics_productId_fkey";

-- AddForeignKey
ALTER TABLE "product_characteristics" ADD CONSTRAINT "product_characteristics_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
