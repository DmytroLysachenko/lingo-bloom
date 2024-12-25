import { LANGUAGES } from "@/constants";
import { createGrammarRule, getCurrentlyExistingRules } from "@/db/grammarRule";
import { generateGrammarRule } from "@/lib/ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { languageCode } = body;

  const language = LANGUAGES[languageCode];

  const { id, name } = language;

  const existingRules = await getCurrentlyExistingRules(id);

  const response = await generateGrammarRule(name, existingRules);

  console.log(response.choices[0].message.content);

  const newRule = await createGrammarRule({
    languageId: id,
    data: response.choices[0].message.content as string,
  });

  return NextResponse.json(
    { message: "Successfully created new grammar rule.", newRule },
    { status: 200 }
  );
}

export async function GET() {}
