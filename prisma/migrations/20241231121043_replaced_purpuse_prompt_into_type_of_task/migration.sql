/*
  Warnings:

  - You are about to drop the column `prompt` on the `TaskPurpose` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TaskPurpose" DROP COLUMN "prompt";

-- AlterTable
ALTER TABLE "TaskType" ADD COLUMN     "promptPurpose" TEXT;
