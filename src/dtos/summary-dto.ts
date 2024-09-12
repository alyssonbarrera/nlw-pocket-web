export type SummaryGoalDTO = {
  id: string;
  title: string;
  completedAt: string;
};

type GoalsPerDay = Record<string, SummaryGoalDTO[]>;

export type SummaryDTO = {
  total: number;
  completed: number;
  goalsPerDay: GoalsPerDay;
};
