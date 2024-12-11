"use client";

import { useGetUserTournaments } from "@/components/shared/lib/hooks/tournament";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/ui";
import { Spinner } from "@/components/shared/ui";
import { useEffect, useState } from "react";

export const TournamentSelector = () => {
  const [selectedTournament, setSelectedTournament] = useState<{
    id: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    // Ensure this code runs only in the browser
    if (typeof window !== "undefined") {
      const savedTournament = localStorage.getItem("selectedTournament");
      if (savedTournament) {
        setSelectedTournament(
          JSON.parse(savedTournament) as { id: string; name: string } | null,
        );
      }
    }
  }, []);

  const { data: tournaments, isLoading, isError } = useGetUserTournaments();

  const handleSelectChange = (value: string) => {
    const [tournamentId, tournamentName] = value.split("|");
    const tournamentData = {
      id: tournamentId ?? "",
      name: tournamentName ?? "",
    };

    setSelectedTournament(tournamentData);
    // Ensure localStorage is only accessed in the browser
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "selectedTournament",
        JSON.stringify(tournamentData),
      );
    }
  };

  if (!isLoading && !isError) {
    console.log(tournaments);
  }

  return (
    <Select
      value={
        selectedTournament
          ? `${selectedTournament.id}|${selectedTournament.name}`
          : undefined
      }
      onValueChange={handleSelectChange}
    >
      <SelectTrigger
        id="tournament"
        className="h-7 w-full max-w-min items-center justify-start gap-2 border-none bg-white text-sm text-black focus:ring-0"
      >
        <SelectValue placeholder={"Select a tournament..."} />
      </SelectTrigger>
      <SelectContent className="border-0 bg-white text-black">
        <SelectGroup>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center">
              <Spinner size={10} />
            </div>
          ) : isError ? (
            <SelectItem value="error" disabled>
              Error loading tournaments
            </SelectItem>
          ) : tournaments && tournaments.length > 0 ? (
            tournaments.map((tournament) => (
              <SelectItem
                key={tournament.id}
                value={`${tournament.id}|${tournament.name} ${tournament.seasonStartYear}/${tournament.seasonEndYear}`}
                className="cursor-pointer"
              >
                {tournament.name} {tournament.seasonStartYear}/
                {tournament.seasonEndYear}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="empty" disabled>
              No tournaments found
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
