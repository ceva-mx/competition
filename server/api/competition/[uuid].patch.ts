import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const uuid = getRouterParam(event, 'uuid');
    const data = await readBody(event);

    return await prisma.competition.update({
      where: { uuid },
      data,
    });
  } catch(error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
    });
  }
});
