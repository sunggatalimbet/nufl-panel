import { TournamentSelector } from "@/components/entities/tournament/ui/tournament-selector";
import { TournamentForm } from "@/components/entities/tournament/ui/tournament-add";
import { TournamentTable } from "@/components/entities/tournament/ui/tounament-table";
import { PageContainer } from "@/components/shared/ui/page-container";

export const Home = () => {
  return (
    <PageContainer>
      <div className="flex w-full flex-row items-center justify-end gap-2">
        <TournamentSelector />
        <TournamentForm />
      </div>
      <div className="w-full">
        <TournamentTable />
      </div>
    </PageContainer>
  );
};
