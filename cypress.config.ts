import { defineConfig } from "cypress";
import { MongoMemoryReplSet } from "mongodb-memory-server";
import waitOn from "wait-on";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3100", // 👈 så cypress besöker rätt port
    async setupNodeEvents(on) {
      // 1) Starta in-memory MongoDB
      const db = await MongoMemoryReplSet.create(); // 👈 med replica-set så Prisma fungerar.
      const dbUri = db.getUri("testing");
      process.env.DATABASE_URL = dbUri; // 👈 för db-anslutning i denna processen (punkt 5)

      // 2) Starta Next.js servern i en ny process
      const { $ } = await import("execa"); // 👈 dynamisk import så esm fungerar
      const server = $({
        env: { ...process.env, NODE_ENV: "test", DATABASE_URL: dbUri },
        stdio: "inherit",
      })`npx next dev -p 3100 --turbopack`;

      // 3) Städa upp MongoDB och Next.js processerna
      const cleanup = () => {
        server.kill();
        db.stop();
      };
      process.on("SIGINT", cleanup); // 👈 om cypress kraschar
      process.on("SIGTERM", cleanup); // 👈 om cypress kraschar
      process.on("exit", cleanup); // 👈 när cypress avslutas
      on("after:run", cleanup); // 👈 när cypress avslutas

      // 4) Vänta tills Next.js-servern är redo
      await waitOn({ resources: ["http://localhost:3100/"], timeout: 30_000 });

      // 5a) Återställ databasen innan varje testfil körs
      on("before:spec", async () => {
        // 👇 dynamisk import så rätt db-url används (se punkt 1)
        const { seedDatabase } = await import("./prisma/seed/seed-db");
        await seedDatabase({ drop: true });
      });

      // 5b) Skapa en task för att återställa databasen innan varje it-test körs
      on("task", {
        async reseed() {
          // 👇 dynamisk import så rätt db-url används (se punkt 1)
          const { seedDatabase } = await import("./prisma/seed/seed-db");
          await seedDatabase({ drop: true });
          return null;
        },
      });
    },
  },
});
