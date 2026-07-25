"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 15; // 秒

type Status = "ready" | "playing" | "over";

export default function CatchGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<Status>("ready");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [best, setBest] = useState(0);

  function start() {
    setScore(0);
    setTimeLeft(DURATION);
    setStatus("playing");
  }

  useEffect(() => {
    if (status !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cssW = 0;
    let cssH = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      cssW = rect.width;
      cssH = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const basket = { x: cssW / 2, w: 92 };
    const basketY = () => cssH - 44;
    const items: {
      x: number;
      y: number;
      vy: number;
      size: number;
      golden: boolean;
    }[] = [];

    let scoreLocal = 0;
    let lastShownScore = -1;
    let lastShownTime = -1;
    let lastSpawn = 0;
    const keys: Record<string, boolean> = {};

    const movePointer = (clientX: number) => {
      const rect = canvas.getBoundingClientRect();
      basket.x = Math.max(
        basket.w / 2,
        Math.min(cssW - basket.w / 2, clientX - rect.left),
      );
    };
    const onMouse = (e: MouseEvent) => movePointer(e.clientX);
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) movePointer(e.touches[0].clientX);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        keys[e.key] = true;
        e.preventDefault();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keys[e.key] = false;
    };
    canvas.addEventListener("mousemove", onMouse);
    canvas.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    const startT = performance.now();
    let prev = startT;
    let raf = 0;

    const loop = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      const elapsed = (now - startT) / 1000;
      const remaining = Math.max(0, DURATION - elapsed);

      // 鍵盤移動
      const speed = 420;
      if (keys["ArrowLeft"]) basket.x -= speed * dt;
      if (keys["ArrowRight"]) basket.x += speed * dt;
      basket.x = Math.max(basket.w / 2, Math.min(cssW - basket.w / 2, basket.x));

      // 生成芒果（隨時間加快）
      const spawnInterval = Math.max(360, 760 - elapsed * 26);
      if (now - lastSpawn > spawnInterval) {
        lastSpawn = now;
        const golden = Math.random() < 0.12;
        items.push({
          x: 26 + Math.random() * (cssW - 52),
          y: -24,
          vy: 130 + elapsed * 12 + Math.random() * 70,
          size: golden ? 36 : 30,
          golden,
        });
      }

      // 更新位置 + 判定接到
      const by = basketY();
      for (let i = items.length - 1; i >= 0; i--) {
        const it = items[i];
        it.y += it.vy * dt;
        const caught =
          it.y + it.size * 0.35 >= by &&
          it.y - it.size * 0.35 <= by + 22 &&
          Math.abs(it.x - basket.x) < basket.w / 2;
        if (caught) {
          scoreLocal += it.golden ? 3 : 1;
          items.splice(i, 1);
        } else if (it.y - it.size > cssH) {
          items.splice(i, 1);
        }
      }

      // 繪製
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const it of items) {
        if (it.golden) {
          ctx.beginPath();
          ctx.fillStyle = "rgba(245, 190, 60, 0.35)";
          ctx.arc(it.x, it.y, it.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.font = `${it.size}px serif`;
        ctx.fillText("🥭", it.x, it.y);
      }
      // 籃子
      ctx.font = "40px serif";
      ctx.fillText("🧺", basket.x, by + 4);

      // 同步 HUD（有變化才更新，減少 render）
      if (scoreLocal !== lastShownScore) {
        lastShownScore = scoreLocal;
        setScore(scoreLocal);
      }
      const shownTime = Math.ceil(remaining);
      if (shownTime !== lastShownTime) {
        lastShownTime = shownTime;
        setTimeLeft(shownTime);
      }

      if (remaining <= 0) {
        setBest((b) => Math.max(b, scoreLocal));
        setStatus("over");
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouse);
      canvas.removeEventListener("touchmove", onTouch);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [status]);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="relative h-[440px] w-full overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-100">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full touch-none"
        />

        {/* HUD */}
        {status === "playing" && (
          <>
            <div className="absolute left-4 top-4 rounded-full bg-background/80 px-4 py-1.5 text-sm font-medium text-foreground backdrop-blur-md">
              得分 <span className="font-serif text-lg">{score}</span>
            </div>
            <div className="absolute right-4 top-4 rounded-full bg-background/80 px-4 py-1.5 text-sm font-medium text-amber-800 backdrop-blur-md">
              ⏱ {timeLeft}s
            </div>
          </>
        )}

        {/* 開始畫面 */}
        {status === "ready" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-foreground/5 px-6 text-center backdrop-blur-[2px]">
            <div className="text-6xl">🧺🥭</div>
            <h2 className="mt-5 font-serif text-3xl text-foreground">接芒果</h2>
            <p className="mt-3 max-w-xs text-sm leading-6 text-foreground/70">
              15 秒內盡量接住掉落的芒果！
              <br />
              移動滑鼠／手指，或用 ← → 方向鍵控制籃子。
              <br />
              <span className="text-amber-800">✨ 發亮的芒果 = 3 分</span>
            </p>
            <button
              type="button"
              onClick={start}
              className="mt-6 rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background transition hover:bg-amber-800"
            >
              開始遊戲
            </button>
          </div>
        )}

        {/* 結束畫面 */}
        {status === "over" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-foreground/10 px-6 text-center backdrop-blur-[2px]">
            <div className="text-5xl">🎉</div>
            <h2 className="mt-4 font-serif text-2xl text-foreground">
              時間到！
            </h2>
            <p className="mt-3 text-foreground/70">你接到了</p>
            <div className="mt-1 font-serif text-6xl text-amber-800">
              {score}
              <span className="ml-1 text-2xl text-foreground/50">分</span>
            </div>
            <p className="mt-2 text-sm text-foreground/55">最高分：{best} 分</p>
            <button
              type="button"
              onClick={start}
              className="mt-6 rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background transition hover:bg-amber-800"
            >
              再玩一次
            </button>
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-foreground/45">
        💡 純娛樂小遊戲，分數不會被記錄，開心玩就好！
      </p>
    </div>
  );
}
