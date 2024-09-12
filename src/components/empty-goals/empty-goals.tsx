import { Plus } from "lucide-react";

import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import logo from "@/assets/logo-in-orbit.svg";
import letsStart from "@/assets/lets-start-illustration.svg";

export function EmptyGoals() {
  return (
    <div className="h-svh flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="in.orbit" />
      <img src={letsStart} alt="Let's start" />

      <footer className="flex flex-col items-center justify-center gap-5">
        <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
          Você ainda não cadastrou nenhuma meta, que tal{" "}
          <span className="underline">cadastrar uma</span> agora mesmo?
        </p>

        <DialogTrigger type="button" asChild>
          <Button>
            <Plus size={16} />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </footer>
    </div>
  );
}
