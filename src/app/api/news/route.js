import { newsAPI } from "@/services/services";
import { NextResponse } from "next/server";

// GET /api/news - Public endpoint for getting published news
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const latest = searchParams.get("latest");
    const limit = searchParams.get("limit");

    let result;

    if (latest === "true") {
      result = await newsAPI.getLatest(limit ? parseInt(limit) : 5);
    } else {
      result = await newsAPI.getPublished();
    }

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
