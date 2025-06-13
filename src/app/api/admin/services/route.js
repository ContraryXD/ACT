import { adminAPI } from "@/services/services";
import { NextResponse } from "next/server";

// GET /api/admin/services - Admin endpoint for getting all services (including inactive)
export async function GET() {
  try {
    // In a real app, you'd verify admin authentication here
    // const user = await verifyAdminToken(request);
    // if (!user || !user.isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const result = await adminAPI.services.getAll();

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/admin/services - Create new service
export async function POST(request) {
  try {
    // In a real app, verify admin authentication here

    const serviceData = await request.json();
    const result = await adminAPI.services.create(serviceData);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result.data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
