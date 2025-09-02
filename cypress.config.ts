import { defineConfig } from "cypress";
import { seedDatabase } from "./prisma/seed/seed-db";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3100",
    async setupNodeEvents(on) {
      on("task", {
        async reseed() {
          await seedDatabase({ drop: true });
          return null;
        },
      });
    },
  },
});
