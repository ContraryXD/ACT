import { projectsAPI } from "@/services/services";
import { NextResponse } from "next/server";

// GET /api/projects - Public endpoint for getting projects
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const status = searchParams.get("status");
    const limit = searchParams.get("limit");

    let result;

    if (featured === "true") {
      result = await projectsAPI.getFeatured(limit ? parseInt(limit) : 4);
    } else if (status) {
      result = await projectsAPI.getByStatus(status);
    } else {
      result = await projectsAPI.getAll();
    }

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
