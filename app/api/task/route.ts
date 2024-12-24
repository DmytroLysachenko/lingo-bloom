import { NextApiRequest, NextApiResponse } from "next";

export async function POST(request: NextApiRequest, response: NextApiResponse) {
  return response.json({ message: "All okay" });
}

export async function GET(request: NextApiRequest, response: NextApiResponse) {
  return response.json({ message: "All okay" });
}
