/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "image" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
