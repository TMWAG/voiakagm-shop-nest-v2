-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_deliveryServiceId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userAddressId_fkey";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "userAddressId" DROP NOT NULL,
ALTER COLUMN "deliveryServiceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userAddressId_fkey" FOREIGN KEY ("userAddressId") REFERENCES "user_addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_deliveryServiceId_fkey" FOREIGN KEY ("deliveryServiceId") REFERENCES "delivery_services"("id") ON DELETE SET NULL ON UPDATE CASCADE;
