import { useQuery } from "@tanstack/react-query";
import { getTournamentTeams } from "../../api/queries/team";

export const useGetTournamentTeams = (tournamentId: number) => {
  return useQuery({
    queryFn: async () => await getTournamentTeams(tournamentId),
    queryKey: ["teams", tournamentId],
    enabled: !!tournamentId,
  });
};
