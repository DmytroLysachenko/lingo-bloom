/*
  Warnings:

  - The `promptSchema` column on the `TaskType` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TaskType" DROP COLUMN "promptSchema",
ADD COLUMN     "promptSchema" JSONB;
