/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productCode` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Product_productCode_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imageUrl",
DROP COLUMN "productCode",
DROP COLUMN "rating",
DROP COLUMN "releaseDate";
