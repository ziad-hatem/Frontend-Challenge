import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/auth-utils";

const prisma = new PrismaClient();

async function main() {
  // Check if admin user already exists
  const adminExists = await prisma.user.findUnique({
    where: { email: "admin@example.com" },
  });

  if (!adminExists) {
    // Create admin user
    const hashedPassword = await hashPassword("password");

    await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
      },
    });

    console.log("Admin user created successfully");
  } else {
    console.log("Admin user already exists");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
