import { PrismaClient } from '@prisma/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { User as PismaUser, Profile } from '@prisma/client';

const prisma = new PrismaClient();

export type User = Pick<PismaUser, 'uuid' | 'email'> & Pick<Profile, 'avaratUrl' | 'name'>;

export default defineEventHandler(async (event) => {
  const contextUser: Maybe<SupabaseUser> = event.context.user;

  if (contextUser?.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: contextUser.email,
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

    if (user) {
      return user;
    }

    const newUser = await prisma.user.create({
      data: {
        email: contextUser.email,
        provider: contextUser.app_metadata.provider || '',
      },
    });
    const profile = await prisma.profile.create({
      data: {
        user: newUser.uuid,
      },
    });

    return {
      uuid: newUser.uuid,
      email: newUser.email,
      Profile: {
        name: profile.name,
        avaratUrl: profile.avaratUrl,
      },
    };
  }
});
