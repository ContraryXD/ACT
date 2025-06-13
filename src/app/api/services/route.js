import { servicesAPI } from "@/services/services";
import { NextResponse } from "next/server";

// GET /api/services - Public endpoint for getting active services
export async function GET() {
  try {
    const result = await servicesAPI.getAll();

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
