// prisma/seed/index.ts
import { db } from "../db";
import { seedTodos } from "./seed-todos";

export async function seedDatabase(opts: { drop?: boolean } = {}) {
  console.log("SEED DB", process.env.NODE_ENV, process.env.DATABASE_URL);
  if (opts.drop) {
    await db.$runCommandRaw({ dropDatabase: 1 });
  }
  await seedTodos();
}
