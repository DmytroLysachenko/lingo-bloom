/*
  Warnings:

  - You are about to drop the column `description` on the `GrammarRule` table. All the data in the column will be lost.
  - You are about to drop the column `example` on the `GrammarRule` table. All the data in the column will be lost.
  - Added the required column `data` to the `GrammarRule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GrammarRule" DROP COLUMN "description",
DROP COLUMN "example",
ADD COLUMN     "data" JSONB NOT NULL;
