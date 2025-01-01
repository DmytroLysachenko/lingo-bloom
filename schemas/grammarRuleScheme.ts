import { z } from "zod";

const languageRuleContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  example: z.string().min(1, "Example is required"),
});

export const grammarRuleDataSchema = z.object({
  en: languageRuleContentSchema,
  pl: languageRuleContentSchema,
  uk: languageRuleContentSchema,
});

export const grammarRuleSchema = z.object({
  id: z.number().positive("id must be a positive number"),
  languageId: z.number().positive("id must be a positive number"),
  checked: z.boolean(),
  data: grammarRuleDataSchema,
});

export const createGrammarRuleSchema = z.object({
  languageId: z.number().positive("languageId must be a positive number"),
});

export const updateGrammarRuleSchema = z.object({
  id: z.number().positive("id must be a positive number"),
  languageId: z.number().positive("id must be a positive number").optional(),
  checked: z.boolean().optional(),
  data: grammarRuleDataSchema,
});

export const deleteGrammarRuleSchema = z.object({
  id: z.number().positive("id must be a positive number"),
});
