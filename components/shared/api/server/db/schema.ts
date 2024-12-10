import { relations, sql } from "drizzle-orm";
import {
  pgTableCreator,
  timestamp,
  varchar,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `nufl-panel_${name}`);

export const tournaments = createTable("tournament", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("userId", { length: 256 }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  seasonStartYear: integer("seasonStartYear").notNull(),
  seasonEndYear: integer("seasonEndYear").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const teams = createTable("team", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("userId", { length: 256 }).notNull(),
  tournamentId: integer("tournamentId")
    .notNull()
    .references(() => tournaments.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 256 }).notNull(),
  image: varchar("image", { length: 1024 }).notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const players = createTable("player", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  teamId: integer("teamId")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  userId: varchar("userId", { length: 256 }).notNull(),
  fullname: varchar("fullname", { length: 256 }).notNull(),
  image: varchar("image", { length: 1024 }).notNull(),
  position: varchar("position", { length: 256 }).notNull().default(""),
  school: varchar("school", { length: 256 }).notNull().default(""),
  levelOfStudy: varchar("levelOfStudy", { length: 256 }).notNull().default(""),
  age: timestamp("age"),
  year: integer("year").notNull().default(0),
  playedGames: integer("playedGames").notNull().default(0),
  goals: integer("goals").notNull().default(0),
  ownGoals: integer("ownGoals").notNull().default(0),
  assists: integer("assists").notNull().default(0),
  cleanSheets: integer("cleanSheets").notNull().default(0),
  yellowCards: integer("yellowCards").notNull().default(0),
  redCards: integer("redCards").notNull().default(0),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const gameweeks = createTable("gameweek", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  tournamentId: integer("tournamentId")
    .notNull()
    .references(() => tournaments.id, { onDelete: "cascade" }),
  userId: varchar("userId", { length: 256 }).notNull(),
  number: integer("number").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
});

export const games = createTable("game", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  gameweekId: integer("gameweekId")
    .notNull()
    .references(() => gameweeks.id, { onDelete: "cascade" }),
  homeTeamId: integer("homeTeamId")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  awayTeamId: integer("awayTeamId")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  userId: varchar("userId", { length: 256 }).notNull(),
  venue: varchar("venue", { length: 256 }).notNull(),
  date: timestamp("date", { withTimezone: true }).notNull(),
  homeTeamScore: integer("homeTeamScore").default(0).notNull(),
  awayTeamScore: integer("awayTeamScore").default(0).notNull(),
  result: varchar("result", { length: 256 }).notNull(),
  gameReport: varchar("gameReport", { length: 256 }).default("").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
});

export const goals = createTable("goal", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("userId", { length: 256 }).notNull(),
  gameId: integer("gameId")
    .notNull()
    .references(() => games.id, { onDelete: "cascade" }),
  teamId: integer("teamId")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  playerId: integer("playerId")
    .notNull()
    .references(() => players.id, { onDelete: "cascade" }),
  isOwnGoals: boolean("isOwnGoals").default(false).notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
});

export const assists = createTable("assist", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("userId", { length: 256 }).notNull(),
  gameId: integer("gameId")
    .notNull()
    .references(() => games.id, { onDelete: "cascade" }),
  playerId: integer("playerId")
    .notNull()
    .references(() => players.id, { onDelete: "cascade" }),
  goalId: integer("goalId")
    .notNull()
    .references(() => goals.id, { onDelete: "cascade" }),
  teamId: integer("teamId")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
});

export const clean_sheets = createTable("clean_sheet", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("userId", { length: 256 }).notNull(),
  gameId: integer("gameId")
    .notNull()
    .references(() => games.id, { onDelete: "cascade" }),
  playerId: integer("playerId")
    .notNull()
    .references(() => players.id, { onDelete: "cascade" }),
  teamId: integer("teamId")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
});

export const cards = createTable("card", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("userId", { length: 256 }).notNull(),
  gameId: integer("gameId")
    .notNull()
    .references(() => games.id, { onDelete: "cascade" }),
  playerId: integer("playerId")
    .notNull()
    .references(() => players.id, { onDelete: "cascade" }),
  teamId: integer("teamId")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  isYellow: boolean("isYellow").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
});

// relations
export const teamsRelations = relations(teams, ({ many }) => ({
  homeGames: many(games, { relationName: "one_team_many_home_games" }),
  awayGames: many(games, { relationName: "one_team_many_away_games" }),
  players: many(players, { relationName: "one_team_many_players" }),
}));

export const playersRelation = relations(players, ({ one, many }) => ({
  goals: many(goals, { relationName: "one_player_many_goals" }),
  assists: many(assists, { relationName: "one_player_many_assists" }),
  cards: many(cards, { relationName: "one_player_many_cards" }),
  team: one(teams, {
    fields: [players.teamId],
    references: [teams.id],
    relationName: "one_team_many_players",
  }),
}));

export const gameweeksRelations = relations(gameweeks, ({ many }) => ({
  games: many(games, { relationName: "one_gameweek_many_games" }),
}));

export const gamesRelations = relations(games, ({ one, many }) => ({
  homeTeam: one(teams, {
    fields: [games.homeTeamId],
    references: [teams.id],
    relationName: "one_team_many_home_games",
  }),
  awayTeam: one(teams, {
    fields: [games.awayTeamId],
    references: [teams.id],
    relationName: "one_team_many_away_games",
  }),
  gameweek: one(gameweeks, {
    fields: [games.gameweekId],
    references: [gameweeks.id],
    relationName: "one_gameweek_many_games",
  }),
  goals: many(goals, { relationName: "one_game_many_goals" }),
  cards: many(cards, { relationName: "one_game_many_cards" }),
}));

export const goalsRelations = relations(goals, ({ one }) => ({
  player: one(players, {
    fields: [goals.playerId],
    references: [players.id],
    relationName: "one_player_many_goals",
  }),
  game: one(games, {
    fields: [goals.gameId],
    references: [games.id],
    relationName: "one_game_many_goals",
  }),
  assist: one(assists, {
    fields: [goals.id],
    references: [assists.goalId],
    relationName: "one_goal_one_assist",
  }),
}));

export const assistsRelations = relations(assists, ({ one }) => ({
  goal: one(goals, {
    fields: [assists.goalId],
    references: [goals.id],
    relationName: "one_goal_one_assist",
  }),
  player: one(players, {
    fields: [assists.playerId],
    references: [players.id],
    relationName: "one_player_many_assists",
  }),
}));

export const cardsRelations = relations(cards, ({ one }) => ({
  player: one(players, {
    fields: [cards.playerId],
    references: [players.id],
    relationName: "one_player_many_cards",
  }),
  game: one(games, {
    fields: [cards.gameId],
    references: [games.id],
    relationName: "one_game_many_cards",
  }),
}));
