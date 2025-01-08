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
  tasks: z.array(
    z.object({
      status: z.string(),
      taskId: z.number().int().nonnegative(),
    })
  ),
});

export type Test = z.infer<typeof testSchema>;
