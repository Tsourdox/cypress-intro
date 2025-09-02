import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3100",
    async setupNodeEvents(on) {
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
