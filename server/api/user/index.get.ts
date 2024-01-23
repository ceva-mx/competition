import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event);
    if (data.email) {
      const user = await prisma.user.findFirst({ where: { email: data.email } });
      return user;
    }
  
    return null;
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
    });
  }
})
