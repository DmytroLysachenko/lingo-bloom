import { tasksA1, tasksA2, tasksB1, tasksB2 } from "@/constants/mockedData";
import { generatePolishGrammarRule } from "@/lib/ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { difficulty } = body;
  switch (difficulty) {
    case "A1":
      return NextResponse.json(tasksA1);
    case "A2":
      return NextResponse.json(tasksA2);
    case "B1":
      return NextResponse.json(tasksB1);
    case "B2":
      return NextResponse.json(tasksB2);

    default:
      break;
  }
}

export async function GET() {
  const data = await generatePolishGrammarRule();

  console.log(JSON.parse(data.choices[0].message.content as string));

  return NextResponse.json({ message: "Success!!!", data }, { status: 200 });
}
