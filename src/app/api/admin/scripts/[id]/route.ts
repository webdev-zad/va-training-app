import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface SessionUser {
  id: string;
  role: string;
}

// GET - Fetch a specific script
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = (await getServerSession(authOptions)) as { user: SessionUser } | null;

    if (!session?.user?.id || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const script = await prisma.script.findUnique({
      where: { id: params.id },
    });

    if (!script) {
      return NextResponse.json({ error: "Script not found" }, { status: 404 });
    }

    return NextResponse.json(script);
  } catch (error) {
    console.error("Error fetching script:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT - Update a script
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const script = await prisma.script.update({
      where: { id: params.id },
      data: {
        objection,
        rebuttals,
        preferred,
      },
    });

    return NextResponse.json(script);
  } catch (error) {
    console.error("Error updating script:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE - Delete a script
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = (await getServerSession(authOptions)) as { user: SessionUser } | null;

    if (!session?.user?.id || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.script.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting script:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
