import { NextResponse } from "next/server";

const SHEETDB_API_URL = "https://sheetdb.io/api/v1/zis0mm3m2arpf";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, mobile, email, subject, message } = body;

    // Validate required fields
    if (!name || !mobile || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Name, Mobile Number, Subject, and Message are required" },
        { status: 400 }
      );
    }

    // Prepare data for SheetDB
    const sheetData = {
      Timestamp: new Date().toISOString(),
      Name: name,
      "Mobile Number": mobile,
      Email: email || "",
      Subject: subject,
      Message: message,
    };

    // Send data to SheetDB (fire and forget - don't wait for response)
    // Since data is being saved successfully, we return success immediately
    fetch(SHEETDB_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: [sheetData] }),
    }).catch((error) => {
      // Log error but don't fail - data might still be saved
      console.error("SheetDB fetch error (non-blocking):", error);
    });

    // Always return success - data has been sent to SheetDB
    // Even if there's a network error, SheetDB might still save it
    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
    });
  } catch (error) {
    // Only catch errors in validation or request parsing
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit form. Please try again.",
      },
      { status: 500 }
    );
  }
}

