import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { ApiError } from "@/lib/utils";

export function apiMiddleware(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            message: "Validation failed",
            errors: error.errors.map((e) => ({
              path: e.path,
              message: e.message,
            })),
          },
          { status: 400 }
        );
      }

      if (error instanceof ApiError) {
        return NextResponse.json(
          { message: error.message },
          { status: error.status }
        );
      }

      console.error("Unhandled error:", error);
      return NextResponse.json(
        { message: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  };
}
