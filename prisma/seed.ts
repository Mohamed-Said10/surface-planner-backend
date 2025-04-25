import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "marrakechsweethome5@gmail.com"; // Replace with the admin's email
  const password = "admin123"; // Replace with a secure password

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the admin user
  const adminUser = await prisma.user.upsert({
    where: { email },
    update: {}, // If the user already exists, do nothing
    create: {
      email,
      password: hashedPassword,
      firstname: "Admin",
      lastname: "User",
      role: "ADMIN", // Set the role to ADMIN
      emailVerified: new Date(), // Mark the email as verified
    },
  });

  console.log("Admin user seeded:", adminUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });