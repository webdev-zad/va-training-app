import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";
import { InputJsonValue } from "@prisma/client/runtime/library";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface SessionUser {
  id: string;
  role: string;
}

interface Message {
  role: "ai" | "va";
  content: string;
  timestamp: string;
  scriptId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const session = (await getServerSession(authOptions)) as { user: SessionUser } | null;

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sessionId, message, action } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 });
    }

    // Get the current simulation session
    const simulationSession = await prisma.simulationSession.findUnique({
      where: { id: sessionId },
      include: { user: true },
    });

    if (!simulationSession) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    if (simulationSession.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentMessages = simulationSession.messages as unknown as Message[];

    if (action === "end") {
      // End the session
      await prisma.simulationSession.update({
        where: { id: sessionId },
        data: { endedAt: new Date() },
      });

      return NextResponse.json({ success: true, ended: true });
    }

    // Add the VA's message
    const updatedMessages: Message[] = [
      ...currentMessages,
      {
        role: "va",
        content: message,
        timestamp: new Date().toISOString(),
      },
    ];

    // Get the original script to provide context to AI
    const firstMessage = currentMessages[0];
    const originalScript = firstMessage?.scriptId
      ? await prisma.script.findUnique({ where: { id: firstMessage.scriptId } })
      : null;

    // Generate AI response
    const aiResponse = await generateAIResponse(message, originalScript, updatedMessages);

    // Add AI response to messages
    const finalMessages: Message[] = [
      ...updatedMessages,
      {
        role: "ai",
        content: aiResponse,
        timestamp: new Date().toISOString(),
      },
    ];

    // Update the session with new messages
    await prisma.simulationSession.update({
      where: { id: sessionId },
      data: { messages: finalMessages as unknown as InputJsonValue },
    });

    return NextResponse.json({
      success: true,
      aiResponse,
      messages: finalMessages,
    });
  } catch (error) {
    console.error("Error handling message:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function generateAIResponse(
  vaMessage: string,
  originalScript: { objection: string; rebuttals: string[]; preferred: string } | null,
  conversationHistory: Message[]
): Promise<string> {
  const systemPrompt = `You are a homeowner in a call with a virtual assistant. You started the conversation with an objection: "${
    originalScript?.objection || "I'm not interested"
  }".

Your role is to:
1. Stay in character as a homeowner
2. Respond naturally to the VA's responses
3. If the VA addresses your objection well, you can show interest or ask follow-up questions
4. If the VA doesn't address your concern, you can repeat or rephrase your objection
5. Keep responses conversational and realistic
6. Don't break character or mention that you're an AI

The conversation should feel natural and help the VA practice handling objections.`;

  const conversationText = conversationHistory
    .map((msg) => `${msg.role === "ai" ? "Homeowner" : "VA"}: ${msg.content}`)
    .join("\n");

  const userPrompt = `Current conversation:
${conversationText}

VA just said: "${vaMessage}"

Respond as the homeowner:`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || "I'm not sure how to respond to that.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "I'm having trouble responding right now. Can you try again?";
  }
}
