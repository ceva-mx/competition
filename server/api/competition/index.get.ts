import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  return prisma.competition.findMany({
    select: {
      uuid: true,
      name: true,
      posterUrl: true,
      description: true,
      link: true,
      isPublished: true,
    }
  });
});
