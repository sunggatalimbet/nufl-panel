"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../server/db";
import { tournaments } from "../server/db/schema";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

const createTournamentSchema = createInsertSchema(tournaments);

async function getTournament() {
  const user = await auth();
  if (!user?.userId) return null;

  const tournament = await db.query.tournaments.findFirst({
    where: eq(tournaments.userId, user.userId),
  });

  return tournament ?? null;
}

export async function createTournament(
  input: typeof createTournamentSchema._type,
) {
  const tournament = createTournamentSchema.parse(input);
  console.log(tournament);
}
