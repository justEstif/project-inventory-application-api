/*
  Warnings:

  - You are about to drop the column `brand_id` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `in_stock` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Item` table. All the data in the column will be lost.
  - Made the column `image` on table `Brand` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `inStock` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_category_id_fkey";

-- AlterTable
ALTER TABLE "Brand" ALTER COLUMN "image" SET NOT NULL;

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "image" SET NOT NULL;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "brand_id",
DROP COLUMN "category_id",
DROP COLUMN "in_stock",
DROP COLUMN "title",
ADD COLUMN     "brandId" TEXT,
ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "inStock" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;
