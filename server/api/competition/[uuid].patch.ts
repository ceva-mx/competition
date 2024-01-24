import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const uuid = getRouterParam(event, 'uuid');
    const data = await readBody(event);
    const competition = await prisma.competition.update({
      where: { uuid },
      data,
    });

    return competition;
  } catch(error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
    });
  }
});
