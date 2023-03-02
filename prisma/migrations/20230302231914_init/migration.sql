/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Characteristic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DeliveryService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Feedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderedProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Parameter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Picture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recommendation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vendor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Characteristic" DROP CONSTRAINT "Characteristic_parameterId_fkey";

-- DropForeignKey
ALTER TABLE "Characteristic" DROP CONSTRAINT "Characteristic_productId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_productId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_userId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_deliveryServiceId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userAddressId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrderedProduct" DROP CONSTRAINT "OrderedProduct_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderedProduct" DROP CONSTRAINT "OrderedProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "Parameter" DROP CONSTRAINT "Parameter_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Picture" DROP CONSTRAINT "Picture_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "Recommendation" DROP CONSTRAINT "Recommendation_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "user_addresses" DROP CONSTRAINT "user_addresses_userId_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Characteristic";

-- DropTable
DROP TABLE "DeliveryService";

-- DropTable
DROP TABLE "Feedback";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderedProduct";

-- DropTable
DROP TABLE "Parameter";

-- DropTable
DROP TABLE "Picture";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "Recommendation";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Vendor";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_surename" TEXT NOT NULL,
    "user_phone" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "vk_link" TEXT,
    "tg_link" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_feegbacks" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "feedback_text" TEXT NOT NULL,
    "feedback_rating" INTEGER NOT NULL,

    CONSTRAINT "product_feegbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "discount" INTEGER,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "sold" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_pictures" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "picture_filename" TEXT NOT NULL,

    CONSTRAINT "product_pictures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendors" (
    "id" SERIAL NOT NULL,
    "vendor_name" TEXT NOT NULL,

    CONSTRAINT "vendors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_categories" (
    "id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,

    CONSTRAINT "product_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_parameters" (
    "id" SERIAL NOT NULL,
    "parameter_name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "product_parameters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_characteristics" (
    "id" SERIAL NOT NULL,
    "parameterId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "characteristic_value" TEXT NOT NULL,

    CONSTRAINT "product_characteristics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recommendations" (
    "id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "recommendation_filename" TEXT NOT NULL,
    "recommendation_rating" INTEGER NOT NULL,
    "recommendation_comment" TEXT NOT NULL,
    "vendorId" INTEGER NOT NULL,

    CONSTRAINT "recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "userAddressId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_status" "OrderStatus" NOT NULL DEFAULT 'NOT_APPROVED',
    "trackNo" TEXT,
    "deliveryServiceId" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_services" (
    "id" SERIAL NOT NULL,
    "delivery_service_name" TEXT NOT NULL,

    CONSTRAINT "delivery_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordered_products" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "ordered_products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_phone_key" ON "users"("user_phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_email_key" ON "users"("user_email");

-- AddForeignKey
ALTER TABLE "product_feegbacks" ADD CONSTRAINT "product_feegbacks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_feegbacks" ADD CONSTRAINT "product_feegbacks_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "product_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_pictures" ADD CONSTRAINT "product_pictures_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_parameters" ADD CONSTRAINT "product_parameters_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "product_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_characteristics" ADD CONSTRAINT "product_characteristics_parameterId_fkey" FOREIGN KEY ("parameterId") REFERENCES "product_parameters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_characteristics" ADD CONSTRAINT "product_characteristics_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recommendations" ADD CONSTRAINT "recommendations_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userAddressId_fkey" FOREIGN KEY ("userAddressId") REFERENCES "user_addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_deliveryServiceId_fkey" FOREIGN KEY ("deliveryServiceId") REFERENCES "delivery_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordered_products" ADD CONSTRAINT "ordered_products_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordered_products" ADD CONSTRAINT "ordered_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
