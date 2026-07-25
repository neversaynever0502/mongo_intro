"use client";

import { useEffect, useState } from "react";

type Status = "idle" | "drawing" | "win" | "lose";

const WIN_RATE = 0.1; // 中獎機率 10%

function makeCoupon() {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `MANGO90-${code}`;
}

export default function LuckyDraw() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [coupon, setCoupon] = useState("");
  const [copied, setCopied] = useState(false);

  // 開啟時鎖定背景捲動、支援 Esc 關閉
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  function reset() {
    setStatus("idle");
    setCoupon("");
    setCopied(false);
  }

  function close() {
    setOpen(false);
    // 關閉後稍等動畫再重置狀態
    setTimeout(reset, 300);
  }

  function draw() {
    if (status === "drawing") return;
    setStatus("drawing");
    setCopied(false);
    // 抽獎動畫延遲，增加期待感
    setTimeout(() => {
      if (Math.random() < WIN_RATE) {
        setCoupon(makeCoupon());
        setStatus("win");
      } else {
        setStatus("lose");
      }
    }, 1500);
  }

  async function copyCoupon() {
    try {
      await navigator.clipboard.writeText(coupon);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 若無法使用剪貼簿，忽略即可（使用者仍可手動複製）
    }
  }

  return (
    <>
      {/* 浮動抽獎按鈕 */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-amber-800 px-5 py-3.5 text-sm font-medium text-amber-50 shadow-xl transition hover:-translate-y-0.5 hover:bg-amber-900 sm:bottom-8 sm:right-8"
        aria-haspopup="dialog"
      >
        <span className="text-lg transition-transform group-hover:rotate-12">
          🎁
        </span>
        抽芒果優惠券
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="芒果優惠券抽獎"
        >
          {/* 背景遮罩，點擊關閉 */}
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={close}
          />

          {/* 彈窗內容 */}
          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-foreground/10 bg-background p-8 text-center shadow-2xl">
            {/* 關閉鈕 */}
            <button
              type="button"
              onClick={close}
              aria-label="關閉"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-foreground/40 transition hover:bg-foreground/5 hover:text-foreground"
            >
              ✕
            </button>

            <div className="text-xs font-medium uppercase tracking-[0.3em] text-amber-800">
              Lucky Draw
            </div>

            {/* 依狀態顯示不同內容 */}
            {status === "idle" && (
              <>
                <div className="mt-5 text-6xl">🎁</div>
                <h3 className="mt-5 font-serif text-2xl text-foreground">
                  芒果優惠券抽獎
                </h3>
                <p className="mt-3 text-sm leading-6 text-foreground/60">
                  有 <span className="font-semibold text-amber-800">10%</span>{" "}
                  的機會抽中芒果<span className="font-semibold">9 折</span>優惠券，
                  <br />
                  快來試試手氣！
                </p>
                <button
                  type="button"
                  onClick={draw}
                  className="mt-7 w-full rounded-full bg-foreground py-3.5 text-sm font-medium text-background transition hover:bg-amber-800"
                >
                  開始抽獎
                </button>
              </>
            )}

            {status === "drawing" && (
              <>
                <div className="mt-5 animate-bounce text-6xl">🥭</div>
                <h3 className="mt-5 font-serif text-2xl text-foreground">
                  抽獎中…
                </h3>
                <p className="mt-3 text-sm text-foreground/60">
                  芒果正在滾動，請稍候
                </p>
                <div className="mt-7 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
                  <div className="h-full w-1/3 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-amber-700" />
                </div>
              </>
            )}

            {status === "win" && (
              <>
                <div className="mt-5 text-6xl">🎉</div>
                <h3 className="mt-5 font-serif text-2xl text-amber-800">
                  恭喜中獎！
                </h3>
                <p className="mt-2 text-sm text-foreground/60">
                  你抽中了芒果 <span className="font-semibold">9 折優惠券</span>
                </p>
                <div className="mt-5 rounded-2xl border border-dashed border-amber-700/50 bg-amber-50/60 p-4">
                  <div className="text-xs text-foreground/50">優惠碼</div>
                  <div className="mt-1 font-mono text-xl font-semibold tracking-wider text-amber-900">
                    {coupon}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={copyCoupon}
                  className="mt-5 w-full rounded-full bg-foreground py-3.5 text-sm font-medium text-background transition hover:bg-amber-800"
                >
                  {copied ? "已複製 ✓" : "複製優惠碼"}
                </button>
                <p className="mt-3 text-xs text-foreground/45">
                  開賣後結帳輸入此碼即可享 9 折
                </p>
              </>
            )}

            {status === "lose" && (
              <>
                <div className="mt-5 text-6xl grayscale">🥭</div>
                <h3 className="mt-5 font-serif text-2xl text-foreground">
                  差一點點！
                </h3>
                <p className="mt-3 text-sm leading-6 text-foreground/60">
                  這次沒有中獎，別灰心，
                  <br />
                  再試一次說不定就是你！
                </p>
                <button
                  type="button"
                  onClick={draw}
                  className="mt-7 w-full rounded-full bg-foreground py-3.5 text-sm font-medium text-background transition hover:bg-amber-800"
                >
                  再抽一次
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
