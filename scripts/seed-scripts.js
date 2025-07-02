const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const sampleScripts = [
  {
    objection: "I'm not interested in your service right now.",
    rebuttals: [
      "I understand you're busy, but this could save you time and money in the long run. What if I could show you how it pays for itself?",
      "That's completely fair. Many people feel that way initially. What specific concerns do you have about our service?",
      "I appreciate your honesty. What would make you interested in learning more about how this could benefit you?",
    ],
    preferred:
      "I understand you're busy, but this could save you time and money in the long run. What if I could show you how it pays for itself?",
  },
  {
    objection: "I don't have the budget for this.",
    rebuttals: [
      "I completely understand budget concerns. What if I told you this could actually help you save money? Let me show you the ROI.",
      "Budget is always a consideration. We have flexible payment options that might work better for your situation. Would you like to explore those?",
      "I hear that often. What's your current budget range? I might be able to suggest a solution that fits within it.",
    ],
    preferred:
      "I completely understand budget concerns. What if I told you this could actually help you save money? Let me show you the ROI.",
  },
  {
    objection: "I need to think about it.",
    rebuttals: [
      "Of course, this is an important decision. What specific aspects would you like to think about? I'm happy to provide more information.",
      "I understand wanting to be thorough. What if I send you some case studies and testimonials to help with your decision?",
      "That's smart. While you're thinking, what questions or concerns do you have that I can address right now?",
    ],
    preferred:
      "Of course, this is an important decision. What specific aspects would you like to think about? I'm happy to provide more information.",
  },
  {
    objection: "I'm already using a competitor's service.",
    rebuttals: [
      "That's great that you're already using a similar service. What do you like and dislike about your current solution?",
      "I'm curious about your experience with them. What made you choose them, and what would you change if you could?",
      "Perfect! That means you understand the value. What if I could show you how we're different and potentially better for your needs?",
    ],
    preferred:
      "That's great that you're already using a similar service. What do you like and dislike about your current solution?",
  },
  {
    objection: "This sounds too good to be true.",
    rebuttals: [
      "I understand your skepticism. Let me show you some real customer results and testimonials. Would that help?",
      "That's a healthy attitude. What specific aspects seem too good to be true? I'd love to address your concerns directly.",
      "I appreciate you being direct. What if I could connect you with some of our current customers to hear their experience?",
    ],
    preferred:
      "I understand your skepticism. Let me show you some real customer results and testimonials. Would that help?",
  },
];

async function seedScripts() {
  try {
    console.log("Starting to seed scripts...");

    for (const script of sampleScripts) {
      await prisma.script.create({
        data: script,
      });
      console.log(`Created script: "${script.objection.substring(0, 50)}..."`);
    }

    console.log("Script seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding scripts:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedScripts();
