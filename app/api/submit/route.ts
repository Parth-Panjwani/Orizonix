import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Submission from "@/lib/Submission";
import nodemailer from "nodemailer";

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

    // 1. Save to MongoDB (Silent Fail — we still want the email to send even if DB fails)
    try {
      await dbConnect();
      await Submission.create({
        name,
        phone,
        company,
        website: website || "",
        budget,
        timestamp: new Date(),
      });
    } catch (dbError) {
      console.error("MongoDB save error (continuing to email):", dbError);
    }

    // 2. Send Email Notification via Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "theorizonix@gmail.com",
        pass: "yonc dlhj zpcp fymw",
      },
    });

    const mailOptions = {
      from: '"Orizonix Contact Form" <theorizonix@gmail.com>',
      to: "theorizonix@gmail.com",
      replyTo: `${name} <no-reply@orizonix.com>`, // We don't have their email in the form, so just a generic replyTo
      subject: `New Lead: ${name} from ${company}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #2563eb; margin-top: 0;">New Contact Form Submission</h2>
          <p style="color: #475569; font-size: 15px;">You have received a new lead from the Orizonix website.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; width: 30%; color: #64748b; font-weight: bold;">Name</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Phone</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">
                <a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Company</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${company}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Website</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">
                ${website ? `<a href="${website.startsWith('http') ? website : `https://${website}`}" target="_blank" style="color: #2563eb; text-decoration: none;">${website}</a>` : "Not provided"}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Budget</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #0f172a;"><strong>${budget}</strong></td>
            </tr>
          </table>
          
          <p style="margin-top: 30px; font-size: 12px; color: #94a3b8;">
            Submitted on Orizonix.com at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Submission saved and email sent successfully.",
    });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process submission." },
      { status: 500 }
    );
  }
}
