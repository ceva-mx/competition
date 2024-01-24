import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const uuid = getRouterParam(event, 'uuid');
    const competition = await prisma.competition.findFirstOrThrow({
      where: {
        uuid,
        isDeleted: false,
      },
      select: {
        name: true,
        posterUrl: true,
        description: true,
        link: true,
        isPublished: true,
      },
    });

    return competition;
  } catch(error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Competition not found',
    });
  }
});
