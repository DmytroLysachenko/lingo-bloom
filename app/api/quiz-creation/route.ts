import { tasksA1, tasksA2, tasksB1, tasksB2 } from "@/constants/mockedData";

export async function POST(request: Request) {
  const body = await request.json();
  const { difficulty } = body;
  switch (difficulty) {
    case "A1":
      return Response.json(tasksA1);

    case "A2":
      return Response.json(tasksA2);
    case "B1":
      return Response.json(tasksB1);
    case "B2":
      return Response.json(tasksB2);

    default:
      break;
  }
}
