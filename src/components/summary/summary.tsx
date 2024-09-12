import { Plus } from "lucide-react";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { DialogTrigger } from "../ui/dialog";
import { InOrbitIcon } from "../in-orbit-icon";
import { OutlineButton } from "../ui/outline-button";
import { Progress, ProgressIndicator } from "../ui/progress-bar";

import dayjs from "dayjs";
import colors from "tailwindcss/colors";
import { GoalTracker } from "../goal-tracker";

export function Summary() {
  const progress = 15;
  const maxProgress = 15;

  function calculateProgressPercentage() {
    const percentage = (progress / maxProgress) * 100;
    return percentage.toFixed(1);
  }

  return (
    <div className="py-10 w-full max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold">5 a 10 de agosto</span>
        </div>

        <DialogTrigger type="button" asChild>
          <Button size="sm">
            <Plus size={16} />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </header>

      <div className="flex flex-col gap-3">
        <Progress value={progress} max={maxProgress}>
          <ProgressIndicator
            style={{
              width: `${calculateProgressPercentage()}%`,
            }}
          />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou <span className="text-zinc-100">{progress}</span> de{" "}
            <span className="text-zinc-100">{maxProgress}</span> metas nessa
            semana.
          </span>
          <span>{calculateProgressPercentage()}%</span>
        </div>
      </div>

      <Separator />

      <div className="flex flex-wrap gap-3">
        <OutlineButton>
          <Plus size={16} color={colors["zinc"]["600"]} />
          Meditar
        </OutlineButton>
        <OutlineButton>
          <Plus size={16} color={colors["zinc"]["600"]} />
          Jogar Elden Ring
        </OutlineButton>
        <OutlineButton>
          <Plus size={16} color={colors["zinc"]["600"]} />
          Jogar Black Myth: Wukong
        </OutlineButton>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        <GoalTracker
          date={dayjs().subtract(1, "days").toDate()}
          goals={[
            {
              id: "1",
              name: "Acordar aa",
              completedAt: dayjs().subtract(1, "days").toDate(),
            },
          ]}
        />

        <GoalTracker
          date={new Date()}
          goals={[
            {
              id: "1",
              name: "Acordar cedo",
              completedAt: new Date(),
            },
          ]}
        />
      </div>
    </div>
  );
}
