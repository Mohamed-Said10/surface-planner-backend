// filepath: c:\Users\admin\Desktop\Projects\Surface Planner\surface-planner6\surface-planner\src\lib\prisma.ts
import { PrismaClient } from "../../node_modules/@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = new PrismaClient();