import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const username = process.env.ADMIN_USERNAME?.trim();
  const fullName = process.env.ADMIN_NAME?.trim() || "مدير النظام";
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password || password.length < 12) {
    throw new Error("Set ADMIN_USERNAME and ADMIN_PASSWORD (minimum 12 characters) in your local .env file.");
  }
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.upsert({
    where: { username },
    update: { fullName, passwordHash, role: UserRole.SYSTEM_ADMIN, active: true },
    create: { username, fullName, passwordHash, role: UserRole.SYSTEM_ADMIN },
  });
  console.log(`Administrator '${username}' is ready. Keep the password private.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(async () => prisma.$disconnect());
