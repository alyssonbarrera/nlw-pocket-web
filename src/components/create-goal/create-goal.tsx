import { z } from "zod";
import { toast } from "react-hot-toast";
import colors from "tailwindcss/colors";
import { LoaderCircle, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

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
import { createGoal } from "@/http/create-goal";

const createGoalFormSchema = z.object({
  title: z.string().min(1, "Informe a atividade que deseja adicionar"),
  desiredWeeklyFrequency: z.coerce
    .number({
      message: "Selecione a frequência desejada",
    })
    .int()
    .min(1, "Informe a frequência desejada")
    .max(7, "Máximo 07"),
});

type CreateGoalFormValues = z.infer<typeof createGoalFormSchema>;

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

  const queryClient = useQueryClient();

  const { register, control, reset, handleSubmit, formState } =
    useForm<CreateGoalFormValues>({
      resolver: zodResolver(createGoalFormSchema),
    });

  const handleSubmitForm = async (values: CreateGoalFormValues) => {
    await createGoal(values);

    const invalidateQueries = [
      queryClient.invalidateQueries({
        queryKey: ["summary"],
      }),
      queryClient.invalidateQueries({
        queryKey: ["pending-goals"],
      }),
    ];

    await Promise.all(invalidateQueries);

    reset();

    toast.success("Meta cadastrada com sucesso!");
  };

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

        <form
          className="flex-1 flex flex-col justify-between"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade?</Label>
              <Input
                id="title"
                autoFocus
                placeholder="Praticar exercícios, meditar, etc..."
                {...register("title")}
              />
              {formState.errors.title && (
                <span className="text-red-400 text-sm">
                  {formState.errors.title.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Quantas vezes na semana?</Label>
              <Controller
                control={control}
                defaultValue={1}
                name="desiredWeeklyFrequency"
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={String(field.value)}
                  >
                    {desiredWeeklyFrequencies.map((frequency) => (
                      <RadioGroupItem
                        key={frequency.value}
                        value={frequency.value}
                      >
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
                )}
              />
              {formState.errors.desiredWeeklyFrequency && (
                <span className="text-red-400 text-sm">
                  {formState.errors.desiredWeeklyFrequency.message}
                </span>
              )}
            </div>
          </div>

          <footer className="flex items-center gap-3">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                disabled={formState.isSubmitting}
              >
                Fechar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting && (
                <LoaderCircle
                  size={16}
                  color={colors["white"]}
                  className="animate-spin"
                />
              )}
              Salvar
            </Button>
          </footer>
        </form>
      </div>
    </DialogContent>
  );
}
