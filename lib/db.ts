import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';

declare global {
  var prisma: PrismaClient | undefined;
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

export const db = globalThis.prisma || prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma= db;