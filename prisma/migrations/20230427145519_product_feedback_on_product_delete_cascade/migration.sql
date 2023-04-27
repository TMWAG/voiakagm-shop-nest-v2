-- DropForeignKey
ALTER TABLE "product_feegbacks" DROP CONSTRAINT "product_feegbacks_productId_fkey";

-- AddForeignKey
ALTER TABLE "product_feegbacks" ADD CONSTRAINT "product_feegbacks_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
