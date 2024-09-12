import type { GoalDTO } from "@/dtos/goal-dto";

type CreateGoalParams = {
  title: string;
  desiredWeeklyFrequency: number;
};

export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalParams): Promise<GoalDTO> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/goals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      desiredWeeklyFrequency,
    }),
  });

  const data = await response.json();
  return data.goal;
}
