import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./components/shared/api/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["nufl-panel_*"],
} satisfies Config;
