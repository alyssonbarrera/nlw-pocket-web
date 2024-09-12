import { X } from "lucide-react";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CreateGoal() {
  const desiredWeeklyFrequencies = [
    {
      label: "1x na semana",
      emoji: "🥱",
      value: "1",
    },
    {
      label: "2x na semana",
      emoji: "🙂",
      value: "2",
    },
    {
      label: "3x na semana",
      emoji: "😎",
      value: "3",
    },
    {
      label: "4x na semana",
      emoji: "😜",
      value: "4",
    },
    {
      label: "5x na semana",
      emoji: "🤨",
      value: "5",
    },
    {
      label: "6x na semana",
      emoji: "🤯",
      value: "6",
    },
    {
      label: "Todos os dias da semana",
      emoji: "🔥",
      value: "7",
    },
  ];

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar meta</DialogTitle>

            <DialogClose>
              <X size={20} className="text-zinc-600" />
            </DialogClose>
          </div>

          <DialogDescription>
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana.
          </DialogDescription>
        </div>

        <form action="" className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade?</Label>
              <Input
                id="title"
                autoFocus
                placeholder="Praticar exercícios, meditar, etc..."
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Quantas vezes na semana?</Label>
              <RadioGroup>
                {desiredWeeklyFrequencies.map((frequency) => (
                  <RadioGroupItem key={frequency.value} value={frequency.value}>
                    <RadioGroupIndicator />
                    <span className="text-zinc-300 text-sm font-medium leading-none">
                      {frequency.label}
                    </span>
                    <span className="text-lg leading-none">
                      {frequency.emoji}
                    </span>
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            </div>
          </div>

          <footer className="flex items-center gap-3">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="flex-1">
                Fechar
              </Button>
            </DialogClose>
            <Button type="submit" variant="primary" className="flex-1">
              Salvar
            </Button>
          </footer>
        </form>
      </div>
    </DialogContent>
  );
}
