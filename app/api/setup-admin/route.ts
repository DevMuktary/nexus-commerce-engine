import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

export async function GET(req: Request) {
  try {
    // 1. Check if an admin already exists (Security Check)
    const existingAdmin = await db.user.findFirst({
      where: { role: "ADMIN" },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin already exists! Setup locked." },
        { status: 403 }
      );
    }

    // 2. Create the Master Admin
    // CHANGE THESE DETAILS TO WHAT YOU WANT
    const hashedPassword = await hash("Admin123", 12); // <--- Temporary Password

    const admin = await db.user.create({
      data: {
        name: "Master Admin",
        email: "admin@nexus.com", // <--- Your Admin Email
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Admin created successfully! Now delete this file.",
      adminEmail: admin.email,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", details: error },
      { status: 500 }
    );
  }
}
