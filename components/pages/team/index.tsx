"use client";

import { TeamHeader } from "@/components/entities/team/ui/TeamHeader";
import { useGetTeam } from "@/components/shared/lib/hooks/team";
import { PageContainer } from "@/components/shared/ui/page-container";

export const Team = ({ teamId }: { teamId: number }) => {
  const { data: team, isLoading, isError } = useGetTeam(teamId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!team) return <div>Team not found.</div>;

  return (
    <PageContainer>
      <TeamHeader name={team.name} logo={team.image} />
    </PageContainer>
  );
};
