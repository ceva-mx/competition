import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  try {
    const competitions = await prisma.competition.findMany({
      select: {
        uuid: true,
        name: true,
        posterUrl: true,
        description: true,
        link: true,
        isPublished: true,
        isDeleted: true,
      },
    });

    return competitions;
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Something goes wrong...',
    });
  }
});
