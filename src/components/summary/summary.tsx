import dayjs from "dayjs";
import { Plus } from "lucide-react";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { DialogTrigger } from "../ui/dialog";
import { InOrbitIcon } from "../in-orbit-icon";
import { Progress, ProgressIndicator } from "../ui/progress-bar";

import { GoalTracker } from "../goal-tracker";
import { PendingGoals } from "../pending-goals";
import type { SummaryDTO } from "@/dtos/summary-dto";

type SummaryProps = {
  data: SummaryDTO;
};

export function Summary({ data }: SummaryProps) {
  const completedGoals = data.completed;
  const totalGoals = data.total;

  const firstDayOfWeek = dayjs().startOf("week").format("D MMM");
  const lastDayOfWeek = dayjs().endOf("week").format("D MMM");

  function completedPercentage() {
    const percentage = (completedGoals / totalGoals) * 100;
    return percentage.toFixed(1);
  }

  return (
    <div className="py-10 w-full max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold">
            Metas de <span className="capitalize">{firstDayOfWeek}</span> a{" "}
            <span className="capitalize">{lastDayOfWeek}</span>
          </span>
        </div>

        <DialogTrigger type="button" asChild>
          <Button size="sm">
            <Plus size={16} />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </header>

      <div className="flex flex-col gap-3">
        <Progress value={completedGoals} max={totalGoals}>
          <ProgressIndicator
            style={{
              width: `${completedPercentage()}%`,
            }}
          />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{" "}
            <span className="text-zinc-100">{completedGoals}</span> de{" "}
            <span className="text-zinc-100">{totalGoals}</span> metas nessa
            semana.
          </span>
          <span>{completedPercentage()}%</span>
        </div>
      </div>

      <Separator />

      <PendingGoals />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        {!data.goalsPerDay && (
          <p className="text-zinc-400 font-normal text-sm">
            Você ainda não completou nenhuma meta essa semana.
          </p>
        )}

        {data.goalsPerDay &&
          Object.entries(data.goalsPerDay).map(([date, goals]) => (
            <GoalTracker key={date} date={date} goals={goals} />
          ))}
      </div>
    </div>
  );
}
