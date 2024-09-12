import type { GoalCompletionDTO } from "@/dtos/goal-completion-dto";

export async function createGoalCompletion(
  goalId: string
): Promise<GoalCompletionDTO> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/goal-completion`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ goalId }),
    }
  );

  const data = await response.json();
  return data.goalCompletion;
}
