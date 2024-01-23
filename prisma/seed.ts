import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

import type {
  user,
  admin,
  competition,
  participant,
  route,
  timeset,
  group,
  result,
} from '@prisma/client';

const prisma = new PrismaClient();

const routesWithCategoryAndCost = [
  { category: '5a', cost: 10 },
  { category: '5b', cost: 20 },
  { category: '5c', cost: 30 },
  { category: '6a', cost: 40 },
  { category: '6b', cost: 50 },
  { category: '6c', cost: 60 },
  { category: '7a', cost: 70 },
  { category: '7b', cost: 80 },
  { category: '7c', cost: 90 },
  { category: '8a', cost: 100 },
  { category: '8b', cost: 110 },
  { category: '8c', cost: 120 },
];

const providers = [
  'google',
  'github',
  'facebook',
];

async function seed() {
  const newUsers: Omit<user, 'uuid'>[] = Array(100)
    .fill(0)
    .map(() => ({
      provider: providers[Math.floor(Math.random() * providers.length)],
      email: faker.internet.email(),
      createdAt: faker.date.recent({ days: 10 }),
      isDeleted: false,
    }));
  
  const newCompetitions: Omit<competition, 'uuid'>[] = Array(3)
    .fill(0)
    .map(() => ({
      name: faker.commerce.product(),
      posterUrl: faker.image.urlLoremFlickr({ category: 'nature' }),
      description: faker.commerce.productDescription(),
      link: null,
      isPublished: false,
      isDeleted: false,
    }));

  await prisma.user.createMany({data: newUsers});
  await prisma.competition.createMany({data: newCompetitions});

  const users: user[] = await prisma.user.findMany();
  const competitions: competition[] = await prisma.competition.findMany();

  competitions.forEach(async (competition, competitionIndex) => {
    const numberOfRoutesPerCompetition = Math.ceil(Math.random() * 10 + 10);
    const numberOfAdminsPerCompetition = Math.ceil(Math.random() * 2 + 1);

    const timesetsForCompetition: Omit<timeset, 'uuid'>[] = Array(3)
      .fill(0)
      .map(() => ({
        competitionUuid: competition.uuid,
        startTime: faker.date.soon({ days: 10, refDate: faker.date.soon({ days: 5 }) }),
        duration: 60 * 60 * 2, // two hours
        isDeleted: false,
      }));

    const groupsForCompetition: Omit<group, 'uuid'>[] = ['beginner', 'mature', 'professional']
      .map((name) => ({
        competitionUuid: competition.uuid,
        name,
        isDeleted: false,
      }));

    await prisma.timeset.createMany({ data: timesetsForCompetition });
    await prisma.group.createMany({ data: groupsForCompetition });

    const timesets: timeset[] = await prisma.timeset.findMany();
    const groups: group[] = await prisma.group.findMany();

    const adminsForCompetition: Omit<admin, 'uuid'>[] = Array(numberOfAdminsPerCompetition)
      .fill(0)
      .map(() => ({
        userUuid: users[Math.floor(Math.random() * users.length)].uuid,
        competitionUuid: competition.uuid,
        isDeleted: false,
      }));

    const participantsForCompetition: Omit<participant, 'uuid'>[] = users
      .slice(competitionIndex * 30, (competitionIndex * 30) + 30)
      .map((user) => ({
        competitionUuid: competition.uuid,
        userUuid: user.uuid,
        timesetUuid: timesets[Math.floor(Math.random() * timesets.length)].uuid,
        groupUuid: groups[Math.floor(Math.random() * groups.length)].uuid,
        isDeleted: false,
      }));

    const newRoutesForCompetition: Omit<route, 'uuid'>[] = Array(numberOfRoutesPerCompetition)
      .fill(0)
      .map(() => {
        const route = routesWithCategoryAndCost[Math.floor(Math.random() * routesWithCategoryAndCost.length)];

        return {
          competitionUuid: competition.uuid,
          name: faker.commerce.product(),
          cost: route.cost,
          category: route.category,
          isDeleted: false,
        };
      });

    await prisma.admin.createMany({ data: adminsForCompetition });
    await prisma.participant.createMany({ data: participantsForCompetition });
    await prisma.route.createMany({ data: newRoutesForCompetition });

    const participants: participant[] = await prisma.participant.findMany();
    const routes: route[] = await prisma.route.findMany();

    participants.forEach(async (participant) => {
      const results: Omit<result, 'uuid'>[] = Array(numberOfRoutesPerCompetition)
      .fill(0)
      .map(() => ({
        routeUuid: routes[Math.floor(Math.random() * routes.length)].uuid,
        participantUuid: participant.uuid,
        finish: [0, 1, 2, 3][Math.floor(Math.random() * 4)],
        attempts: Math.ceil(Math.random() * 10),
        isDeleted: false,
      }));

      await prisma.result.createMany({ data: results });
    });
  });
}

try {
  await seed();
  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}
