import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const uuid = getRouterParam(event, 'uuid');

    return await prisma.competition.findFirstOrThrow({
      where: {
        uuid,
      },
      select: {
        name: true,
        posterUrl: true,
        description: true,
        link: true,
      },
    });
  } catch(error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Competition not found',
    });
  }
});
