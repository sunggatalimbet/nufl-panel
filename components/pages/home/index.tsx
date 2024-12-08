import TournamentSelector from "@/components/entities/tournament/ui/tournament-selector";
import { PageContainer } from "@/components/shared/ui/page-container";
import TournamentForm from "../../entities/tournament/ui/tournament-add";

export const Home = () => {
  return (
    <PageContainer>
      <div className="flex w-full flex-row items-center justify-end gap-4">
        <TournamentSelector />
        <TournamentForm />
      </div>
    </PageContainer>
  );
};
