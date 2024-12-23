import { z } from "zod";

// Define custom types for JSON fields
const LanguageDataSchema = z.object({
  en: z.object({
    title: z.string(),
    description: z.string(),
    example: z.string(),
  }),
  pl: z.object({
    title: z.string(),
    description: z.string(),
    example: z.string(),
  }),
  uk: z.object({
    title: z.string(),
    description: z.string(),
    example: z.string(),
  }),
});

const TaskDataSchema = z.object({
  question: z.string(),
  answers: z.array(z.string()),
  correctAnswer: z.string(),
});

// Define models
export const LanguageSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().unique(),
  code: z.string().unique(),
  grammarRules: z.array(z.number().int()).optional(), // Assuming grammarRules is an array of IDs
  tasks: z.array(z.number().int()).optional(), // Assuming tasks is an array of IDs
});

export const LanguageLevelSchema = z.object({
  id: z.number().int().optional(),
  level: z.string().unique(),
  description: z.string().optional().nullable(),
  tasks: z.array(z.number().int()).optional(), // Assuming tasks is an array of IDs
});

export const GrammarRuleSchema = z.object({
  id: z.number().int().optional(),
  data: LanguageDataSchema,
  languageId: z.number().int(),
});

export const TaskTypeSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().unique(),
  tasks: z.array(z.number().int()).optional(), // Assuming tasks is an array of IDs
});

export const TaskPurposeSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().unique(),
  tasks: z.array(z.number().int()).optional(), // Assuming tasks is an array of IDs
});

export const TaskTopicSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().unique(),
  tasks: z.array(z.number().int()).optional(), // Assuming tasks is an array of IDs
});

export const TaskSchema = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  languageId: z.number().int(),
  taskTypeId: z.number().int(),
  taskPurposeId: z.number().int(),
  taskTopicId: z.number().int().optional().nullable(),
  languageLevelId: z.number().int(),
  data: TaskDataSchema,
});

export const TestSchema = z.object({
  id: z.string(),
  userId: z.string(),
  startedAt: z.date(),
  completedAt: z.date().optional().nullable(),
  status: z.enum(["in-progress", "completed"]),
  totalTasks: z.number().int(),
  progress: z.number().min(0).max(100),
  score: z.number().optional().nullable(),
});

export const TaskProgressSchema = z.object({
  id: z.string(),
  userId: z.string(),
  taskId: z.number().int(),
  status: z.enum(["not-started", "in-progress", "completed"]),
  tries: z.number().int().min(0),
  score: z.number().min(0).max(1).optional(),
  completedAt: z.date().optional().nullable(),
});
