import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler((event) => {
  const uuid = getRouterParam(event, 'uuid');

  prisma.competition.delete({
    where: {
      uuid,
    },
  });
});
