-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "grammarRuleId" INTEGER;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_grammarRuleId_fkey" FOREIGN KEY ("grammarRuleId") REFERENCES "GrammarRule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
