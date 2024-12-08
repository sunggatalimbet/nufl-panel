import { ChartNoAxesColumnIcon } from "lucide-react";
import { FutbolIcon, TeamIcon } from "@/components/shared/ui";

export const SIDEBAR_ELEMENTS = [
  {
    id: "teams",
    name: "Teams",
    icon: (
      <div className="flex h-8 w-8 items-center sm:h-6 sm:w-6">
        <TeamIcon />
      </div>
    ),
  },
  {
    id: "games",
    name: "Games",
    icon: (
      <div className="flex h-8 w-8 items-center sm:h-6 sm:w-6">
        <FutbolIcon />
      </div>
    ),
  },
  {
    id: "statistics",
    name: "Statistics",
    icon: (
      <div className="flex h-8 w-8 items-center sm:h-6 sm:w-6">
        <ChartNoAxesColumnIcon />
      </div>
    ),
  },
];
