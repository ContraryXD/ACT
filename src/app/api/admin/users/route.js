import { supabaseAdmin } from "@/lib/supabase";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Admin access not configured" }, { status: 500 });
    }

    const { data, error } = await supabaseAdmin.from("users").select("id, username, email, full_name, role, is_active, created_at, updated_at").order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Admin access not configured" }, { status: 500 });
    }
    const userData = await request.json();

    // Hash the password if provided
    if (userData.password) {
      try {
        const saltRounds = 10;
        userData.password = await bcrypt.hash(userData.password, saltRounds);
      } catch (hashError) {
        console.error("Error hashing password:", hashError);
        return NextResponse.json({ error: "Failed to hash password" }, { status: 500 });
      }
    }
    const { data, error } = await supabaseAdmin.from("users").insert([userData]).select().single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Remove password from response for security
    const { password: _, ...userWithoutPassword } = data;

    return NextResponse.json({ data: userWithoutPassword, error: null });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Admin access not configured" }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const updates = await request.json();

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Hash password if being updated
    if (updates.password && updates.password !== "") {
      const saltRounds = 10;
      updates.password = await bcrypt.hash(updates.password, saltRounds);
    } else if (updates.password === "") {
      // Remove password if empty (don't update it)
      delete updates.password;
    }

    const { data, error } = await supabaseAdmin.from("users").update(updates).eq("id", id).select().single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Remove password from response for security
    const { password: _, ...userWithoutPassword } = data;

    return NextResponse.json({ data: userWithoutPassword, error: null });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Admin access not configured" }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from("users").delete().eq("id", id);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
