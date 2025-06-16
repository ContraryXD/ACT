import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// POST /api/auth/login - Admin login
export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate required fields
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    // Get user from database
    const { data: user, error } = await supabaseAdmin.from("users").select("*").eq("username", username).eq("is_active", true).single();

    if (error || !user) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    // For now, we'll use a simple password check (you should hash passwords in production)
    // This is a temporary solution - in production, use bcrypt.compare()
    const isValidPassword = password === "admin123"; // Replace with actual password checking

    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
