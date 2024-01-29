# DB Diagram
https://dbdiagram.io/d/competitions-6595c465ac844320ae31a188

# Info
## Generate schema
Download schema from `dbdiagram.io` for PostgreSQL.  
Import this file to empty database and run `pnpm dlx prisma db pull` to generate `prisma/schema.prisma`

## Generate API client
Run `pnpm dlx prisma generate` to get fresh API client with types accordingly to [prisma/schema.prisma](prisma/schema.prisma).  
## Use API client
```js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
await prisma.user.create(...);
```

Types are stored in generated client, and helper types are inside `Prisma` type:
```js
import type { User, Prisma} from '@prisma/client';
const newUsers: Prisma.UserCreateManyInput[] = [{ /* typed! */ }];
const users: User[] = await prisma.user.createMany({data: newUsers});
```

## Generate fake data
Run `pnpm dlx prisma migrate reset`  
This will drop all tables and execute [prisma/seed.ts](prisma/seed.ts) to genenerate new data.  
More info [here](https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding).