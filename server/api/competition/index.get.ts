import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  // prisma.competition.findMany({
  //   include: {
  //     Admin: {
  //       include: {
  //         User: true,
  //       }
  //     }
  //   }
  //   where: {
  //     Admin: {
  //       User: {

  //       }
  //     }
  //   }
  // });

  return prisma.competition.findMany({
    select: {
      uuid: true,
      name: true,
      posterUrl: true,
      description: true,
      link: true,
      isPublished: true,
    }
  });
});
