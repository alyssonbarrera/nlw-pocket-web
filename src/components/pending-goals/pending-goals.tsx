import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { useTransition } from "react";
import colors from "tailwindcss/colors";
import type { GoalDTO } from "@/dtos/goal-dto";
import { OutlineButton } from "../ui/outline-button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getWeekPendingGoals } from "@/http/get-week-pending-goals";
import { createGoalCompletion } from "@/http/create-goal-completion";

export function PendingGoals() {
  const [isPending, startTransition] = useTransition();

  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery<GoalDTO[]>({
    queryKey: ["pending-goals"],
    queryFn: getWeekPendingGoals,
    staleTime: 1000 * 60 * 1, // 1 minute
  });

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId);

    const invalidateQueries = [
      queryClient.invalidateQueries({
        queryKey: ["summary"],
      }),
      queryClient.invalidateQueries({
        queryKey: ["pending-goals"],
      }),
    ];

    await Promise.all(invalidateQueries);

    toast.success("Meta concluída com sucesso!");
  }

  if (isFetching && !data) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data?.map((goal) => (
        <OutlineButton
          key={goal.id}
          disabled={
            goal.completionCount >= goal.desiredWeeklyFrequency || isPending
          }
          onClick={() => {
            startTransition(() => {
              handleCompleteGoal(goal.id);
            });
          }}
        >
          <Plus size={16} color={colors["zinc"]["600"]} />
          {goal.title}
        </OutlineButton>
      ))}
    </div>
  );
}
