/*
  Warnings:

  - Added the required column `used` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "used" BOOLEAN NOT NULL;
