/*
  Warnings:

  - You are about to drop the column `description` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `brand` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `discountPercentage` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Item` table. All the data in the column will be lost.
  - Added the required column `image` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `in_stock` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "brand",
DROP COLUMN "categoryId",
DROP COLUMN "discountPercentage",
DROP COLUMN "images",
DROP COLUMN "stock",
DROP COLUMN "thumbnail",
ADD COLUMN     "brand_id" TEXT,
ADD COLUMN     "category_id" TEXT,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "in_stock" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;
