import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  return prisma.competition.findMany({
    select: {
      name: true,
      posterUrl: true,
      description: true,
    }
  });
});
