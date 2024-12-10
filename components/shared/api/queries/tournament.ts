"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../server/db";
import { tournaments } from "../server/db/schema";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

const createTournamentSchema = createInsertSchema(tournaments, {
  userId: (schema) => schema.userId.optional(),
});

export async function getUserTournaments() {
  try {
    const user = await auth();
    if (!user?.userId) return null;
    const userTournaments = await db.query.tournaments.findMany({
      where: eq(tournaments.userId, user.userId),
    });

    return userTournaments;
  } catch (error) {
    console.error("Error fetching user tournaments:", error);
    return null;
  }
}

export async function getTournament() {
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

  // Insert the tournament into the database
  try {
    const user = await auth();
    if (!user?.userId) throw new Error("User not authenticated");

    const newTournament = await db
      .insert(tournaments)
      .values({
        ...tournament,
        userId: user.userId, // Associate the tournament with the authenticated user
      })
      .returning();

    return newTournament; // Return the newly created tournament
  } catch (error) {
    console.error("Error creating tournament:", error);
    throw error; // Rethrow the error for further handling
  }
}
