-- DropForeignKey
ALTER TABLE "product_characteristics" DROP CONSTRAINT "product_characteristics_parameterId_fkey";

-- AddForeignKey
ALTER TABLE "product_characteristics" ADD CONSTRAINT "product_characteristics_parameterId_fkey" FOREIGN KEY ("parameterId") REFERENCES "product_parameters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
