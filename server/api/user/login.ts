import { PrismaClient } from '@prisma/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

const prisma = new PrismaClient();

async function getUser(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      uuid: true,
      email: true,
      Profile: {
        select: {
          name: true,
          avaratUrl: true,
        },
      },
    },
  });

  return user;
}

export default defineEventHandler(async (event) => {
  const contextUser: Maybe<SupabaseUser> = event.context.user;

  if (!contextUser?.email) {
    return;
  }

  const user = await getUser(contextUser.email);

  if (user) {
    return user;
  }

  await prisma.user.create({
    data: {
      email: contextUser.email,
      provider: contextUser.app_metadata.provider || '',
      Profile: {
        create: {
          avaratUrl: null,
          name: null,
        },
      },
    },
  });

  const newUser = await getUser(contextUser.email);

  return newUser;
});
