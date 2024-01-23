import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async () => {

  return prisma.competition.findMany({
    where: {
      uuid: '48dd6dae-7067-4d78-9775-268579ab4036',
    },
    select: {
      name: true,
      Participant: {
        select: {
          User: {
            select: {
              name: true,
            },
          },
          Result: {
            select: {
              finish: true,
              attempts: true,
            },
          },
        },
      },
    },
  });
});
