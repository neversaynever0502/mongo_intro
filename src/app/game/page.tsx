import type { Metadata } from "next";
import CatchGame from "@/components/CatchGame";

export const metadata: Metadata = {
  title: "接芒果小遊戲 — 日光芒果",
  description: "15 秒限時接芒果小遊戲，純娛樂，來挑戰你的手速！",
};

export default function GamePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:py-24">
      <div className="mb-10 text-center">
        <div className="text-xs font-medium uppercase tracking-[0.3em] text-foreground/50">
          Mini Game
        </div>
        <h1 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl lg:text-5xl">
          接芒果小遊戲
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-foreground/70">
          休息一下，來場 15 秒的手速挑戰——盡量接住從天而降的芒果吧！
        </p>
      </div>

      <CatchGame />
    </div>
  );
}
