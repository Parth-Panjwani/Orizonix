import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Submission from "@/lib/Submission";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get("password");

  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    return NextResponse.json(
      { success: false, error: "Invalid password." },
      { status: 401 }
    );
  }

  try {
    await dbConnect();

    const submissions = await Submission.find({})
      .sort({ timestamp: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      submissions,
    });
  } catch (error) {
    console.error("Records fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch records." },
      { status: 500 }
    );
  }
}
