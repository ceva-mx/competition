import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event);

    prisma.user.create({ data });
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
    });
  }
})
