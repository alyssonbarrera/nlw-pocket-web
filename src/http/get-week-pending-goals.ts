import type { GoalDTO } from "@/dtos/goal-dto";

export async function getWeekPendingGoals(): Promise<GoalDTO[]> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/pending-goals`);
  const data = await response.json();
  return data.goals;
}
