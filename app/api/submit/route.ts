import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Submission from "@/lib/Submission";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, company, website, budget } = body;

    if (!name || !phone || !company || !budget) {
      return NextResponse.json(
        { success: false, error: "Name, Phone, Company, and Budget are required." },
        { status: 400 }
      );
    }

    await dbConnect();

    await Submission.create({
      name,
      phone,
      company,
      website: website || "",
      budget,
      timestamp: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Submission saved successfully.",
    });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save submission." },
      { status: 500 }
    );
  }
}
