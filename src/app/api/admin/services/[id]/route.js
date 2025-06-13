import { adminAPI } from "@/services/services";
import { NextResponse } from "next/server";

// PUT /api/admin/services/[id] - Update service
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const updates = await request.json();

    const result = await adminAPI.services.update(id, updates);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/admin/services/[id] - Delete service
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const result = await adminAPI.services.delete(id);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
