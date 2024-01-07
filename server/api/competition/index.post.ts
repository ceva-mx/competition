import { PrismaClient } from '@prisma/client';
import type { Competition } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const data: Competition = {
      uuid: faker.string.uuid(),
      name: body.name,
      link: body.link,
      description: body.description,
      posterUrl: '',
      isPublished: false,
    };

    return await prisma.competition.create({ data });
  } catch(e) {
    return false;
  }
});
