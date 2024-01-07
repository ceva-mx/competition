import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

import type {
  User,
  Competition,
  Route,
  Admin,
  Result,
  Participant,
} from '@prisma/client';

const prisma = new PrismaClient();

function createUser(): User {
  return {
    uuid: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
  };
}

function createCompetition(): Competition {
  return {
    uuid: faker.string.uuid(),
    name: faker.company.name(),
    posterUrl: faker.image.urlLoremFlickr({ category: 'nature' }),
    description: faker.commerce.productDescription(),
    link: '',
    isPublished: false,
  }
}

function createParticipant(userUuid: string, competitionUuid: string): Participant {
  return {
    uuid: faker.string.uuid(),
    userUuid,
    competitionUuid,
  };
}

const categories = ['5a', '5b', '5c', '6a', '6b', '6c', '7a', '7b', '7c', '8a', '8b', '8c'];
function createRoute(competitionUuid: string): Route {
  return {
    uuid: faker.string.uuid(),
    name: faker.commerce.product(),
    category: categories[Math.floor(Math.random() * categories.length)],
    cost: faker.number.int({ min: 20, max: 150 }),
    competitionUuid,
  };
}

/**
 * 0 = none
 * 1 = zone
 * 2 = redpoint
 * 3 = top
 */
const resuls = [0, 1, 2, 3];
function createResult(routeUuid: string, participantUuid: string): Result {
  return {
    uuid: faker.string.uuid(),
    routeUuid,
    participantUuid,
    attempts: faker.number.int({ min: 1, max: 20 }),
    finish: resuls[Math.floor(Math.random() * resuls.length)],
  };
}

function createAdmin(userUuid: string, competitionUuid: string): Admin {
  return {
    uuid: faker.string.uuid(),
    userUuid,
    competitionUuid,
  }
}

async function seed() {
  const users = [];
  const competitions = [];
  const participants = [];
  const routes = [];
  const result = [];
  const admins = [];

  for (let i = 0; i < 30; i++) {
    users.push(createUser());
  }

  for (let i = 0; i < 3; i++) {
    const competition = createCompetition();
    const user = users[Math.floor(Math.random() * users.length)];
    competitions.push(competition);
    admins.push(createAdmin(user.uuid, competition.uuid));

    for (let j = 0; j < 15; j++) {
      const user = users[Math.floor(Math.random() * users.length)];
      participants.push(createParticipant(user.uuid, competition.uuid));
    }

    for (let j = 0; j < 30; j++) {
      const route = createRoute(competition.uuid);
      routes.push(route);

      const results = Math.floor(Math.random() * 10) + 5;

      for (let j = 0; j < results; j++) {
        const participant = participants[Math.floor(Math.random() * participants.length)];
        result.push(createResult(route.uuid, participant.uuid));
      }
    }

  }

  await prisma.user.createMany({ data: users });
  await prisma.competition.createMany({ data: competitions });
  await prisma.route.createMany({ data: routes });
  await prisma.participant.createMany({ data: participants });
  await prisma.admin.createMany({ data: admins });
  await prisma.result.createMany({ data: result });
}

try {
  await seed();
  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}