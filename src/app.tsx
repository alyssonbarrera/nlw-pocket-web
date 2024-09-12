import { LoaderCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Summary } from "./components/summary";
import { Dialog } from "./components/ui/dialog";
import { CreateGoal } from "./components/create-goal";
import { EmptyGoals } from "./components/empty-goals";

import { getSummary } from "./http/get-summary";
import type { SummaryDTO } from "./dtos/summary-dto";

import colors from "tailwindcss/colors";

export function App() {
  const { data, isFetching } = useQuery<SummaryDTO>({
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isFetching && !data) {
    return (
      <div className="h-svh flex items-center justify-center">
        <LoaderCircle
          size={48}
          color={colors["pink"][600]}
          className="animate-spin"
        />
      </div>
    );
  }

  return (
    <Dialog>
      {data && data.total > 0 ? <Summary data={data} /> : <EmptyGoals />}
      <CreateGoal />
    </Dialog>
  );
}
