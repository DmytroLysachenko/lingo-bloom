import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { ApiError } from "@/lib/utils";

export function apiMiddleware(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      // Call the actual handler
      return await handler(req);
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle Zod validation errors
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
        // Handle custom API errors
        return NextResponse.json(
          { message: error.message },
          { status: error.status }
        );
      }

      // Log other errors for debugging
      console.error("Unhandled error:", error);

      // Handle generic/unexpected errors (default to 500)
      return NextResponse.json(
        { message: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  };
}
