import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const uuid = getRouterParam(event, 'uuid');

  try {
    await prisma.competition.delete({ where: { uuid } });
    return true;
  } catch(e) {
    return false;
  }
});
