import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface SessionUser {
  id: string;
  role: string;
}

export async function POST() {
  try {
    const session = (await getServerSession(authOptions)) as { user: SessionUser } | null;

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get a random script/objection
    const scripts = await prisma.script.findMany();

    if (scripts.length === 0) {
      return NextResponse.json(
        {
          error: "No scripts available. Please ask an admin to add some objection scripts.",
        },
        { status: 404 }
      );
    }

    const randomScript = scripts[Math.floor(Math.random() * scripts.length)];

    // Create a new simulation session
    const simulationSession = await prisma.simulationSession.create({
      data: {
        userId: session.user.id,
        messages: [
          {
            role: "ai",
            content: randomScript.objection,
            timestamp: new Date().toISOString(),
            scriptId: randomScript.id,
          },
        ],
      },
    });

    return NextResponse.json({
      sessionId: simulationSession.id,
      initialMessage: randomScript.objection,
      scriptId: randomScript.id,
    });
  } catch (error) {
    console.error("Error starting simulation:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
