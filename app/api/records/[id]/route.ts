import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Submission from "@/lib/Submission";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get("password");
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    return NextResponse.json(
      { success: false, error: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    await dbConnect();

    const allowedUpdates = ["status", "notes", "followUpDate", "value"];
    const updates: Record<string, any> = {};

    for (const key of allowedUpdates) {
      if (body[key] !== undefined) {
        updates[key] = body[key];
      }
    }

    const updated = await Submission.findByIdAndUpdate(
      params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Record not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, submission: updated });
  } catch (error) {
    console.error("Record update error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update record." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get("password");
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    return NextResponse.json(
      { success: false, error: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    await dbConnect();
    const deleted = await Submission.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Record not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Record deleted." });
  } catch (error) {
    console.error("Record delete error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete record." },
      { status: 500 }
    );
  }
}
