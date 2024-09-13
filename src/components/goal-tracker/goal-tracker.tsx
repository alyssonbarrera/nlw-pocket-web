import dayjs from "dayjs";
import colors from "tailwindcss/colors";
import { CheckCircle2 } from "lucide-react";
import dayjsLocale from "dayjs/locale/pt-br";
import type { SummaryGoalDTO } from "@/dtos/summary-dto";

dayjs.locale(dayjsLocale);

type GoalTrackerProps = {
  date: string;
  goals: SummaryGoalDTO[];
};

export function GoalTracker({ date, goals }: GoalTrackerProps) {
  const weekDay = dayjs(new Date(date))
    .format("dddd")
    .replace(/./, (caracter) => caracter.toUpperCase());

  const formattedDate = dayjs(date).format("DD [de] MMMM");

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-medium">
        {weekDay}{" "}
        <span className="text-zinc-400 text-sm">({formattedDate})</span>
      </h3>

      <ul className="flex flex-col gap-3">
        {goals.map((goal) => (
          <li key={goal.id} className="flex items-center gap-2">
            <CheckCircle2 size={16} color={colors["pink"]["500"]} />
            <span className="text-sm text-zinc-400">
              Você completou <span className="text-zinc-100">{goal.title}</span>{" "}
              às{" "}
              <span className="text-zinc-100">
                {dayjs(goal.completedAt).format("HH:mm")}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
