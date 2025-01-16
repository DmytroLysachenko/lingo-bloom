import { z } from "zod";

export const createTestSchema = z.object({
  languageId: z.number().int().positive(),
  languageLevelId: z.number().int().positive(),
  quantity: z.number().int().positive(),
  userId: z.string(),
});

export const testSchema = z.object({
  id: z.string(),
  userId: z.string(),
  startedAt: z.date(),
  completedAt: z.date().nullable(),
  status: z.string(),
  totalTasks: z.number().int().positive(),
  progress: z.number(),
  score: z.number().nullable(),
  tasks: z.array(
    z.object({
      isCompleted: z.boolean(),
      taskId: z.number().int().nonnegative(),
      score: z.number().optional(),
    })
  ),
});

export const testArraySchema = z.array(testSchema);

export type TestArray = z.infer<typeof testArraySchema>;
export type Test = z.infer<typeof testSchema>;
