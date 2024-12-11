"use client";

import { useGetTournamentTeams } from "@/components/shared/lib/hooks/team";

import { cn } from "@/components/shared/lib/utils/clsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shared/ui";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const TournamentTable = () => {
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

  const {
    data: teamTournaments,
    isLoading,
    isError,
  } = useGetTournamentTeams(
    selectedTournament ? Number(selectedTournament.id) : 0,
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error.</div>;

  return (
    <div className="bg-card max-w-[400px] rounded-lg border-[1px] border-white/20 p-4">
      <h2 className="text-card-foreground mb-4 text-2xl font-bold">
        {selectedTournament?.name}
      </h2>
      <div className="relative overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[60px]">Pos</TableHead>
              <TableHead>Club</TableHead>
              <TableHead className="text-center">PL</TableHead>
              <TableHead className="text-center">GD</TableHead>
              <TableHead className="text-center">Pts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamTournaments?.map((team, index) => (
              <TableRow
                key={team.name}
                className={cn(
                  "hover:bg-muted/50 transition-colors",
                  index % 2 === 0 ? "bg-transparent" : "bg-muted/30",
                )}
              >
                <TableCell className="font-medium">{index}</TableCell>
                <TableCell>
                  <Link href={`/teams/${team.id}`} className="w-full">
                    <div className="flex items-center gap-3">
                      <Image
                        src={team.image}
                        alt={team.name}
                        width={20}
                        height={20}
                      />
                      <span>{team.name}</span>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  {team.gamesPlayed}
                </TableCell>
                <TableCell className="text-center">
                  {team.goalsScored - team.goalsConceeded}
                </TableCell>
                <TableCell className="text-center font-semibold">
                  {team.scoredPoints}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
