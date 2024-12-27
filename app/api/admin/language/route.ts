import {
  createGrammarRule,
  deleteGrammarRule,
  findAllLanguageGrammarRules,
  updateGrammarRule,
} from "@/db/grammarRule";
import { findLanguageById } from "@/db/language";
import { generateGrammarRule } from "@/lib/ai";
import { parseJsonData } from "@/lib/utils";
import { apiMiddleware } from "@components/providers/apiMiddleware";
import { NextRequest, NextResponse } from "next/server";

export const POST = apiMiddleware(async (request: NextRequest) => {
  const body = await request.json();

  const languageId = Number(body.languageId);

  const [language, existingRules] = await Promise.all([
    findLanguageById(languageId),
    findAllLanguageGrammarRules(languageId),
  ]);

  if (!language)
    return NextResponse.json(
      { message: `There is no language with such id: ${languageId}` },
      { status: 400 }
    );

  const existingRulesTitles = existingRules.map(
    (rule) => parseJsonData(rule).data.en.title
  );

  const data = await generateGrammarRule(language.name, existingRulesTitles);

  if (!data)
    return NextResponse.json(
      {
        message: `Something went wrong during rule generation, try again later.`,
      },
      { status: 500 }
    );

  const newRule = await createGrammarRule({
    languageId,
    data,
  });

  return NextResponse.json(
    { message: "Successfully created new grammar rule.", newRule },
    { status: 200 }
  );
});

export const PATCH = apiMiddleware(async (request: NextRequest) => {
  const data = await request.json();

  const updatedTask = await updateGrammarRule(data.id, { ...data });

  return NextResponse.json(
    { message: "Successfully approved new grammar rule.", updatedTask },
    { status: 200 }
  );
});

export const DELETE = apiMiddleware(async (request: NextRequest) => {
  const data = await request.json();

  await deleteGrammarRule(data.id);

  return NextResponse.json({ status: 204 });
});
