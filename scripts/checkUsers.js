(async () => {
  // dynamic import to satisfy ESLint rule forbidding require()
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  try {
    const users = await prisma.user.findMany();
    console.log('users:', users);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('error querying users:', message);
  } finally {
    await prisma.$disconnect();
  }
})();
