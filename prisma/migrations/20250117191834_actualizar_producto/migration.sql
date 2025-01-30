/*
  Warnings:

  - You are about to drop the column `reactions` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `specifications` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "reactions",
DROP COLUMN "specifications",
DROP COLUMN "stock";
