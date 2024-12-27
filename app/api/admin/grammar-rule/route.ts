import {
  createGrammarRule,
  deleteGrammarRule,
  findAllLanguageGrammarRules,
  findGrammarRuleById,
  updateGrammarRule,
} from "@/db/grammarRule";
import { findLanguageById } from "@/db/language";
import { generateGrammarRule } from "@/lib/ai";
import { ApiError, parseJsonData } from "@/lib/utils";
import {
  createGrammarRuleSchema,
  deleteGrammarRuleSchema,
  grammarRuleDataSchema,
  updateGrammarRuleSchema,
} from "@/schemas";
import { apiMiddleware } from "@components/providers/apiMiddleware";
import { NextRequest, NextResponse } from "next/server";

export const POST = apiMiddleware(async (request: NextRequest) => {
  const body = await request.json();

  const parsedBody = createGrammarRuleSchema.parse(body);

  const { languageId } = parsedBody;

  const [language, existingRules] = await Promise.all([
    findLanguageById(languageId).catch(() => {
      throw new ApiError("Database error while fetching language.", 500);
    }),
    findAllLanguageGrammarRules(languageId).catch(() => {
      throw new ApiError("Database error while fetching existing rules.", 500);
    }),
  ]);

  if (!language) {
    throw new ApiError(`Language with id ${languageId} not found.`, 404);
  }

  const existingRulesTitles = existingRules.map(
    (rule) => parseJsonData(rule).data.en.title
  );

  const data = await generateGrammarRule(language.name, existingRulesTitles);

  if (!data) {
    throw new ApiError(
      `Something went wrong during rule generation, try again later.`,
      500
    );
  }

  grammarRuleDataSchema.parse(JSON.parse(data));

  const newRule = await createGrammarRule({
    languageId,
    data,
  }).catch(() => {
    throw new ApiError("Database error while creating grammar rule.", 500);
  });

  return NextResponse.json(
    { message: "Successfully created new grammar rule.", newRule },
    { status: 200 }
  );
});

export const PATCH = apiMiddleware(async (request: NextRequest) => {
  const body = await request.json();

  const parsedBody = updateGrammarRuleSchema.parse(body);

  if (parsedBody.data) grammarRuleDataSchema.parse(JSON.parse(parsedBody.data));

  const rule = await findGrammarRuleById(parsedBody.id).catch(() => {
    throw new ApiError("Database error while checking rule existance.", 500);
  });

  if (!rule) {
    throw new ApiError(`Rule with id ${parsedBody.id} not found.`, 400);
  }

  const updatedRule = await updateGrammarRule(parsedBody.id, {
    ...parsedBody,
  });

  console.log(updatedRule);

  return NextResponse.json(
    { message: "Successfully approved new grammar rule.", updatedRule },
    { status: 200 }
  );
});

export const DELETE = apiMiddleware(async (request: NextRequest) => {
  const body = await request.json();

  const parsedBody = deleteGrammarRuleSchema.parse(body);

  await deleteGrammarRule(parsedBody.id);

  return NextResponse.json({ status: 204 });
});
