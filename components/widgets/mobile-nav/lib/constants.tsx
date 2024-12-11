import { FutbolIcon, TeamIcon } from "@/components/shared/ui";
import { BarChartIcon, TrophyIcon } from "lucide-react";

export const MOBILE_NAV_ELEMENTS = [
  {
    id: "teams",
    name: "Teams",
    icon: <TeamIcon />,
  },
  {
    id: "",
    name: "Tournaments",
    icon: <TrophyIcon />,
  },
  {
    id: "games",
    name: "Games",
    icon: <FutbolIcon />,
  },
  {
    id: "statistics",
    name: "Statistics",
    icon: <BarChartIcon />,
  },
];
