import { PrismaClient } from '@prisma/client';
import type { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const data: Prisma.CompetitionCreateInput = {
      name: body.name,
      link: body.link,
      description: body.description,
    };
    const competition = await prisma.competition.create({ data });

    return competition;
  } catch(e) {
    return false;
  }
});
