import { NextResponse } from "next/server";
import { contactsAPI } from "@/services/services";

// POST /api/contacts - Create new contact submission
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json({ error: "Missing required fields: name, email, subject, and message are required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    } // Create contact data object (matching the actual table structure)
    const contactData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      subject: body.subject.trim(),
      message: body.message.trim(),
      is_read: false,
    };

    // Save to database using the contactsAPI
    const result = await contactsAPI.create(contactData);

    if (result.error) {
      console.error("Database error:", result.error);
      return NextResponse.json({ error: "Failed to save contact information" }, { status: 500 });
    }

    return NextResponse.json(
      {
        message: "Contact information saved successfully",
        success: true,
        data: result.data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON format in request body" }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET /api/contacts - Get all contacts (for admin use)
export async function GET() {
  try {
    const result = await contactsAPI.getAll();

    if (result.error) {
      console.error("Database error:", result.error);
      return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
    }

    return NextResponse.json(result.data || []);
  } catch (error) {
    console.error("Contacts GET API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
