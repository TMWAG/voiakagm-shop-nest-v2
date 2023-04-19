/*
  Warnings:

  - You are about to drop the `PurchasedProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PurchasedProducts" DROP CONSTRAINT "PurchasedProducts_productId_fkey";

-- DropForeignKey
ALTER TABLE "PurchasedProducts" DROP CONSTRAINT "PurchasedProducts_userId_fkey";

-- DropTable
DROP TABLE "PurchasedProducts";

-- CreateTable
CREATE TABLE "purchased_products" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "purchased_products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "purchased_products" ADD CONSTRAINT "purchased_products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchased_products" ADD CONSTRAINT "purchased_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
