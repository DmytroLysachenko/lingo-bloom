/*
  Warnings:

  - Added the required column `prompt` to the `TaskPurpose` table without a default value. This is not possible if the table is not empty.
  - Added the required column `promptSchema` to the `TaskType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskPurposeId` to the `TaskType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskPurpose" ADD COLUMN     "prompt" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TaskType" ADD COLUMN     "promptSchema" TEXT NOT NULL,
ADD COLUMN     "taskPurposeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TaskType" ADD CONSTRAINT "TaskType_taskPurposeId_fkey" FOREIGN KEY ("taskPurposeId") REFERENCES "TaskPurpose"("id") ON DELETE CASCADE ON UPDATE CASCADE;
