-- AlterTable
ALTER TABLE "GrammarRule" ADD COLUMN     "checked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "checked" BOOLEAN NOT NULL DEFAULT false;
