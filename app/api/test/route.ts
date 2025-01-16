import { findTasksWithDiversity } from "@/db/task";
import { createTest } from "@/db/test";
import { findUserById } from "@/db/user";
import { ApiError } from "@/lib/utils";
import { createTestSchema } from "@/schemas/testScheme";
import { apiMiddleware } from "@components/providers/apiMiddleware";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log(request);
  return NextResponse.json({ message: "All ok" });
}

export const POST = apiMiddleware(async (request: NextRequest) => {
  const body = await request.json();
  const parsedBody = createTestSchema.parse(body);

  const { userId, languageId, languageLevelId, quantity } = parsedBody;

  const user = await findUserById(parsedBody.userId);

  if (!user) throw new ApiError(`User not found`, 404);

  const tasks = await findTasksWithDiversity({
    languageId,
    languageLevelId,
    quantity,
  });

  if (tasks.length === 0) {
    return NextResponse.json(
      { error: "No tasks found matching the criteria" },
      { status: 404 }
    );
  }

  const newTest = await createTest({ userId, totalTasks: tasks.length, tasks });

  return NextResponse.json(
    {
      message: `Successfully created new test.`,
      newTest,
    },
    { status: 200 }
  );
});
