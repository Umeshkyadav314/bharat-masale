import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, mobile, address, email, contactMethod, message } = body;

    if (!name || !mobile || !address || !email || !contactMethod) {
      return NextResponse.json(
        { error: "Name, mobile, address, email and contact preference are required." },
        { status: 400 }
      );
    }

    const validMethod = contactMethod === "CALLBACK" || contactMethod === "EMAIL";
    if (!validMethod) {
      return NextResponse.json(
        { error: "Contact preference must be Callback or Email." },
        { status: 400 }
      );
    }

    await prisma.inquiry.create({
      data: {
        name: name.trim(),
        mobile: mobile.trim(),
        address: address.trim(),
        email: email.trim(),
        contactMethod,
        message: message?.trim() || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not submit inquiry." },
      { status: 500 }
    );
  }
}
