const { PrismaClient } = require('@prisma/client');

(async () => {
  const prisma = new PrismaClient();
  try {
    const users = await prisma.user.findMany();
    console.log('users:', users);
  } catch (err) {
    console.error('error querying users:', err.message || err);
  } finally {
    await prisma.$disconnect();
  }
})();
