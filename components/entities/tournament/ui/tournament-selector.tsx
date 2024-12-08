"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/ui";
import { useState } from "react";

interface Tournament {
  id: string;
  name: string;
  season: string;
}

export default function TournamentSelector() {
  const [selectedTournament, setSelectedTournament] =
    useState<Tournament | null>(null);

  const changeTournament = (value: string) => {
    const tournament = tournaments.find((t) => t.id === value);
    setSelectedTournament(tournament ?? null);
  };

  // mock data
  const tournaments: Tournament[] = [
    { id: "1", name: "NVFL", season: "23/24" },
    { id: "2", name: "NVFL", season: "22/23" },
    { id: "3", name: "NVFL", season: "21/22" },
  ];

  return (
    <Select onValueChange={changeTournament}>
      <SelectTrigger
        id="tournament"
        className="h-full w-full max-w-min items-center justify-start gap-2 border-none bg-white text-sm text-black focus:ring-0"
      >
        <SelectValue placeholder="Select a tournament" />
      </SelectTrigger>
      <SelectContent className="border-0 bg-white text-black">
        <SelectGroup>
          {tournaments.map((tournament) => (
            <SelectItem
              key={tournament.id}
              value={tournament.id}
              className="cursor-pointer"
            >
              {tournament.name} {tournament.season}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
