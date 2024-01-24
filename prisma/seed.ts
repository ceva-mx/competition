import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import type { Prisma } from '@prisma/client';

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
  const newUsers: Prisma.UserCreateManyInput[] = Array(100)
    .fill(0)
    .map(() => ({
      provider: providers[Math.floor(Math.random() * providers.length)],
      email: faker.internet.email(),
      createdAt: faker.date.recent({ days: 10 }),
    }));

  const newCompetitions: Prisma.CompetitionCreateManyInput[] = Array(3)
    .fill(0)
    .map(() => ({
      name: faker.commerce.product(),
      posterUrl: faker.image.urlLoremFlickr({ category: 'nature' }),
      description: faker.commerce.productDescription(),
    }));

  await prisma.user.createMany({data: newUsers});
  await prisma.competition.createMany({data: newCompetitions});

  const users = await prisma.user.findMany();
  const competitions = await prisma.competition.findMany();

  const profiles: Prisma.ProfileCreateManyInput[] = users.map((user) => ({
    user: user.uuid,
    name: faker.person.fullName(),
    avaratUrl: faker.image.avatar(),
  }));

  await prisma.profile.createMany({ data: profiles });

  competitions.forEach(async (competition, competitionIndex) => {
    const numberOfRoutesPerCompetition = Math.ceil(Math.random() * 10 + 10);
    const numberOfAdminsPerCompetition = Math.ceil(Math.random() * 2 + 1);

    const timesetsForCompetition: Prisma.TimesetCreateManyInput[] = Array(3)
      .fill(0)
      .map(() => ({
        competition: competition.uuid,
        startTime: faker.date.soon({ days: 10, refDate: faker.date.soon({ days: 5 }) }),
        duration: 60 * 60 * 2, // two hours
      }));

    const groupsForCompetition: Prisma.GroupCreateManyInput[] = ['beginner', 'mature', 'professional']
      .map((name) => ({
        competition: competition.uuid,
        name,
      }));

    await prisma.timeset.createMany({ data: timesetsForCompetition });
    await prisma.group.createMany({ data: groupsForCompetition });

    const timesets = await prisma.timeset.findMany();
    const groups = await prisma.group.findMany();

    const adminsForCompetition: Prisma.AdminCreateManyInput[] = Array(numberOfAdminsPerCompetition)
      .fill(0)
      .map(() => ({
        user: users[Math.floor(Math.random() * users.length)].uuid,
        competition: competition.uuid,
      }));

    const participantsForCompetition: Prisma.ParticipantCreateManyInput[] = users
      .slice(competitionIndex * 30, (competitionIndex * 30) + 30)
      .map((user) => ({
        competition: competition.uuid,
        user: user.uuid,
        timeset: timesets[Math.floor(Math.random() * timesets.length)].uuid,
        group: groups[Math.floor(Math.random() * groups.length)].uuid,
      }));

    const newRoutesForCompetition: Prisma.RouteCreateManyInput[] = Array(numberOfRoutesPerCompetition)
      .fill(0)
      .map(() => {
        const route = routesWithCategoryAndCost[Math.floor(Math.random() * routesWithCategoryAndCost.length)];

        return {
          competition: competition.uuid,
          name: faker.commerce.product(),
          cost: route.cost,
          category: route.category,
        };
      });

    await prisma.admin.createMany({ data: adminsForCompetition });
    await prisma.participant.createMany({ data: participantsForCompetition });
    await prisma.route.createMany({ data: newRoutesForCompetition });

    const participants = await prisma.participant.findMany();
    const routes = await prisma.route.findMany();

    participants.forEach(async (participant) => {
      const results: Prisma.ResultCreateManyInput[] = Array(numberOfRoutesPerCompetition)
        .fill(0)
        .map(() => ({
          route: routes[Math.floor(Math.random() * routes.length)].uuid,
          participant: participant.uuid,
          finish: [0, 1, 2, 3][Math.floor(Math.random() * 4)],
          attempts: Math.ceil(Math.random() * 10),
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
