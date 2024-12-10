import {
  getUserTournaments,
  createTournament,
} from "@/components/shared/api/queries/tournament";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type ITournament = {
  name: string;
  seasonStartYear: number;
  seasonEndYear: number;
};

export const useGetUserTournaments = () => {
  return useQuery({
    queryFn: async () => await getUserTournaments(),
    queryKey: ["tournament"],
  });
};

// New hook to create a tournament
export const useCreateTournament = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: ITournament) => await createTournament(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tournament"] });
      console.log("Tournament created successfully");
    },
    onError: (error) => {
      console.error("Error creating tournament:", error);
    },
  });
};
