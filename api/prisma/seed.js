/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
const { PrismaClient } = require('@prisma/client');
const DATABASE_URL = process.env.DATABASE_URL;
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
});

async function main() {
  // Roles
  // Admin
  const roleAdmin = await prisma.role.create({
    data: {
      name: 'admin',
      description: 'Administrador',
    },
  });

  // Client
  const roleClient = await prisma.role.create({
    data: {
      name: 'client',
      description: 'Cliente',
    },
  });

  // Plan
  // Free
  const plan1 = await prisma.plan.create({
    data: {
      name: 'free',
      whatsapp: 1,
    },
  });

  // Silver
  const plan2 = await prisma.plan.create({
    data: {
      name: 'silver',
      whatsapp: 2,
    },
  });

  // Gold
  const plan3 = await prisma.plan.create({
    data: {
      name: 'gold',
      whatsapp: 4,
    },
  });

  // Platinum
  const plan4 = await prisma.plan.create({
    data: {
      name: 'platinum',
      whatsapp: 8,
    },
  });

  // Users
  // Admin
  const user = await prisma.user.create({
    data: {
      email: 'admin@wa-yummy.com',
      password: '$2a$12$8jFuyblEcSiSOTeuJQqAhun20x9SPkkA9kNmTdP4c/ESYuHeVx6Ua', // asdasd123
      name: 'Senior Administrator',
      image: 'https://i.imgur.com/iRjnS.jpg',
      roleId: roleAdmin.id,
      planId: plan4.id,
    },
  });
  const account = await prisma.account.create({
    data: {
      userId: user.id,
      type: 'whatsapp',
      provider: 'whatsapp',
      providerAccountId: '5491132323232',
    },
  });

  // Client user
  const user2 = await prisma.user.create({
    data: {
      email: 'client@wa-yummy.com',
      password: '$2a$12$8jFuyblEcSiSOTeuJQqAhun20x9SPkkA9kNmTdP4c/ESYuHeVx6Ua', // asdasd123
      name: 'Regular Client',
      image: 'https://i.imgur.com/iRjnS.jpg',
      roleId: roleClient.id,
      planId: plan2.id,
    },
  });
  const account3 = await prisma.account.create({
    data: {
      userId: user2.id,
      type: 'whatsapp',
      provider: 'whatsapp',
      providerAccountId: '549113213212',
    },
  });

  // Demo user (free)

  const user3 = await prisma.user.create({
    data: {
      email: 'demo@wa-yummy.com',
      password: '$2a$12$8jFuyblEcSiSOTeuJQqAhun20x9SPkkA9kNmTdP4c/ESYuHeVx6Ua', // asdasd123
      name: 'Demo User',
      image: 'https://i.imgur.com/iRjnS.jpg',
      roleId: roleClient.id,
      planId: plan1.id,
    },
  });

  const account2 = await prisma.account.create({
    data: {
      userId: user3.id,
      type: 'whatsapp',
      provider: 'whatsapp',
      providerAccountId: '5491132323234',
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
