"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../server/db";
import { teams } from "../server/db/schema";
import { and, eq } from "drizzle-orm";

export async function getTournamentTeams(tournamentId: number) {
  try {
    const user = await auth();
    if (!user?.userId) return null;
    console.log(user.userId);
    const tournamentTeams = await db.query.teams.findMany({
      where: and(
        eq(teams.tournamentId, tournamentId),
        eq(teams.userId, user.userId),
      ),
    });

    return tournamentTeams;
  } catch (error) {
    console.error("Error fetching tournament teams:", error);
    return null;
  }
}

export async function getTeam(teamId: number) {
  try {
    const user = await auth();
    if (!user?.userId) return null;
    console.log(user.userId);

    const team = await db.query.teams.findFirst({
      where: and(eq(teams.id, teamId), eq(teams.userId, user.userId)),
    });

    return team;
  } catch (error) {
    console.error("Error fetching tournament teams:", error);
    return null;
  }
}
