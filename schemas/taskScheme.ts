import { z } from "zod";

export const createTaskSchema = z.object({
  languageId: z.number().int().positive(),
  languageLevelId: z.number().int().positive(),
  taskTypeId: z.number().int().positive(),
  taskPurposeId: z.number().int().positive(),
  taskTopicId: z.number().int().positive().optional(),
  grammarRuleId: z.number().int().positive().optional(),
  quantity: z.number().int().positive(),
});

export const testTaskDataSchema = z.object({
  question: z.string(),
  answers: z.array(z.string()),
  correctAnswer: z.string(),
});

export const testTextTaskDataSchema = z.object({
  text: z.string(),
  question: z.string(),
  answers: z.array(z.string()),
  correctAnswer: z.string(),
});

export const connectionTaskDataScheme = z.object({
  columnA: z.array(z.string()),
  columnB: z.array(z.string()),
  matches: z.array(
    z.object({
      columnAIndex: z.number().int().nonnegative(),
      columnBIndex: z.number().int().nonnegative(),
    })
  ),
});

export const fillInBlankTaskDataScheme = z.object({
  question: z.string(),
  blanks: z.array(
    z.object({
      index: z.number().int().nonnegative(),
      answer: z.string(),
    })
  ),
});

export const taskDataScheme = z.union([
  testTextTaskDataSchema,
  testTaskDataSchema,
  connectionTaskDataScheme,
  fillInBlankTaskDataScheme,
]);

export const tasksDataArrayScheme = z.array(taskDataScheme);

export const updateTaskSchema = z.object({
  id: z.number().int().positive(),
  languageId: z.number().int().positive().optional(),
  languageLevelId: z.number().int().positive().optional(),
  taskTypeId: z.number().int().positive().optional(),
  taskPurposeId: z.number().int().positive().optional(),
  taskTopicId: z.number().int().positive().optional().nullable(),
  grammarRuleId: z.number().int().positive().optional().nullable(),
  checked: z.boolean().optional(),
  data: taskDataScheme,
});

export const deleteTaskSchema = z.object({
  id: z.number().int().positive(),
});

export const taskSchema = z.object({
  id: z.number().int().positive(),
  languageId: z.number().int().positive(),
  languageLevelId: z.number().int().positive(),
  taskTypeId: z.number().int().positive(),
  taskPurposeId: z.number().int().positive(),
  taskTopicId: z.number().int().positive().nullable(),
  grammarRuleId: z.number().int().positive().nullable(),
  checked: z.boolean(),
  data: taskDataScheme,
});

export type TaskData = z.infer<typeof taskDataScheme>;
export type Task = z.infer<typeof taskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;
