import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Team } from "@/components/pages/team";
import { getTeam } from "@/components/shared/api/queries/team";

export default async function TeamsPage({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const { teamId } = await params;
  const numberTeamId = Number(teamId);
  const queryClient = new QueryClient();

  // Prefetch the team data on the server
  await queryClient.prefetchQuery({
    queryKey: ["team", teamId],
    queryFn: () => getTeam(numberTeamId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Team teamId={numberTeamId} />
    </HydrationBoundary>
  );
}
