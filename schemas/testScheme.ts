import { z } from "zod";

export const createTestSchema = z.object({
  languageId: z.number().int().positive(),
  languageLevelId: z.number().int().positive(),
  quantity: z.number().int().positive(),
  userId: z.string(),
});
