import { useQuery } from "@tanstack/react-query";
import { getTeam, getTournamentTeams } from "../../api/queries/team";

export const useGetTournamentTeams = (tournamentId: number) => {
  return useQuery({
    queryFn: async () => await getTournamentTeams(tournamentId),
    queryKey: ["tournament", tournamentId],
    enabled: !!tournamentId,
  });
};

export const useGetTeam = (teamId: number) => {
  return useQuery({
    queryFn: () => getTeam(teamId),
    queryKey: ["team", teamId],
    enabled: !!teamId,
  });
};
