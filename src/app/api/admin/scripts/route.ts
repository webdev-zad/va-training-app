import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface SessionUser {
  id: string;
  role: string;
}
// GET - Fetch all scripts
export async function GET() {
  try {
    const session = (await getServerSession(authOptions)) as { user: SessionUser } | null;
    if (!session?.user?.id || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const scripts = await prisma.script.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(scripts);
  } catch (error) {
    console.error("Error fetching scripts:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST - Create a new script
export async function POST(request: NextRequest) {
  try {
    const session = (await getServerSession(authOptions)) as { user: SessionUser } | null;
    if (!session?.user?.id || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { objection, rebuttals, preferred } = await request.json();

    if (!objection || !rebuttals || !preferred) {
      return NextResponse.json(
        {
          error: "Objection, rebuttals, and preferred rebuttal are required",
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(rebuttals) || rebuttals.length === 0) {
      return NextResponse.json(
        {
          error: "At least one rebuttal is required",
        },
        { status: 400 }
      );
    }

    if (!rebuttals.includes(preferred)) {
      return NextResponse.json(
        {
          error: "Preferred rebuttal must be one of the provided rebuttals",
        },
        { status: 400 }
      );
    }

    const script = await prisma.script.create({
      data: {
        objection,
        rebuttals,
        preferred,
      },
    });

    return NextResponse.json(script, { status: 201 });
  } catch (error) {
    console.error("Error creating script:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
