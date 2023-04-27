-- DropForeignKey
ALTER TABLE "product_parameters" DROP CONSTRAINT "product_parameters_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "product_parameters" ADD CONSTRAINT "product_parameters_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "product_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
