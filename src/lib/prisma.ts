// filepath: c:\Users\admin\Desktop\Projects\Surface Planner\surface-planner6\surface-planner\src\lib\prisma.ts
import { PrismaClient } from "../generated/prisma";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;