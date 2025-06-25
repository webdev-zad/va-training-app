const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12)
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: adminPassword,
      role: "admin",
      name: "Admin User",
    },
  })

  // Create VA user
  const vaPassword = await bcrypt.hash("va123", 12)
  const va = await prisma.user.upsert({
    where: { email: "va@example.com" },
    update: {},
    create: {
      email: "va@example.com",
      password: vaPassword,
      role: "va",
      name: "VA User",
    },
  })

  console.log("Database seeded successfully!")
  console.log("Admin user:", { email: admin.email, role: admin.role })
  console.log("VA user:", { email: va.email, role: va.role })
  console.log("\nTest credentials:")
  console.log("Admin: admin@example.com / admin123")
  console.log("VA: va@example.com / va123")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
