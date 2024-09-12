import dayjs from "dayjs";
import colors from "tailwindcss/colors";
import { CheckCircle2 } from "lucide-react";
import dayjsLocale from "dayjs/locale/pt-br";

dayjs.locale(dayjsLocale);

type GoalTrackerProps = {
  date: Date;
  goals: {
    id: string;
    name: string;
    completedAt: Date;
  }[];
};

export function GoalTracker({ date, goals }: GoalTrackerProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-medium">
        {dayjs(date)
          .format("dddd")
          .replace(/./, (caracter) => caracter.toUpperCase())}{" "}
        <span className="text-zinc-400 text-sm">
          ({dayjs(date).format("DD [de] MMMM")})
        </span>
      </h3>

      <ul className="flex flex-col gap-3">
        {goals.map((goal) => (
          <li key={goal.id} className="flex items-center gap-2">
            <CheckCircle2 size={16} color={colors["pink"]["500"]} />
            <span className="text-sm text-zinc-400">
              Você completou <span className="text-zinc-100">{goal.name}</span>{" "}
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
