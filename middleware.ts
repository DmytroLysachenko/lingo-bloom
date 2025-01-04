import { getToken } from "@auth/core/jwt";
import { NextRequest, NextResponse } from "next/server";
import {
  apiAdminUrlsArray,
  apiUserUrlsArray,
  frontendAdminUrlsArray,
  frontendUserUrlsArray,
} from "@/constants/routes";

const AUTH_SECRET = process.env.AUTH_SECRET;

// Utility function to check role-based access
const isAuthorized = (
  pathname: string,
  role: string | undefined,
  rules: Record<string, string[]>
) => {
  if (rules.admin.includes(pathname)) return role === "admin";
  if (rules.user.includes(pathname)) return Boolean(role); // Any authenticated user
  return true; // Allow public or unprotected routes
};

// Define role-based access rules
const accessRules = {
  api: {
    admin: apiAdminUrlsArray,
    user: apiUserUrlsArray,
  },
  frontend: {
    admin: frontendAdminUrlsArray,
    user: frontendUserUrlsArray,
  },
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Redirect to login if token is missing
  const token = await getToken({ req, secret: AUTH_SECRET });
  const role = token?.role as string;
  const loginUrl = new URL("/login", req.url);

  if (pathname.startsWith("/api")) {
    if (!isAuthorized(pathname, role, accessRules.api)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } else {
    if (!isAuthorized(pathname, role, accessRules.frontend)) {
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}
