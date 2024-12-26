/*
  Warnings:

  - You are about to drop the column `level` on the `LanguageLevel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `LanguageLevel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `LanguageLevel` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "LanguageLevel_level_key";

-- AlterTable
ALTER TABLE "LanguageLevel" DROP COLUMN "level",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "LanguageLevel_name_key" ON "LanguageLevel"("name");
