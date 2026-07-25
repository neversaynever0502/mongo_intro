"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useName } from "./NameProvider";

export default function WelcomeGate() {
  const { name, ready, promptOpen, skipped, saveName, dismiss } = useName();
  const [value, setValue] = useState("");

  // 等 localStorage 載入後再判斷：沒有存過稱呼才詢問（或手動開啟改稱呼）
  const visible = ready && (promptOpen || (!name && !skipped));
  const editing = Boolean(name); // 已有稱呼 = 修改模式

  useEffect(() => {
    if (!visible) return;
    setValue(name);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) return null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    saveName(value);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="輸入稱呼"
    >
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={dismiss}
      />

      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-foreground/10 bg-background p-8 text-center shadow-2xl">
        <div className="text-5xl">🥭</div>
        <h2 className="mt-4 font-serif text-2xl text-foreground">
          {editing ? "換個稱呼吧" : "歡迎來到日光芒果"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-foreground/60">
          {editing
            ? "想讓我們怎麼稱呼你呢？"
            : "初次見面！方便告訴我們怎麼稱呼你嗎？"}
        </p>

        <form onSubmit={submit} className="mt-6">
          <input
            type="text"
            autoFocus
            maxLength={20}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="例如：小明、芒果控"
            aria-label="你的稱呼"
            className="h-13 w-full rounded-full border border-foreground/15 bg-white/60 px-6 py-3 text-center text-base text-foreground outline-none backdrop-blur-md transition placeholder:text-foreground/35 focus:border-amber-700/50 focus:ring-2 focus:ring-amber-700/20"
          />
          <button
            type="submit"
            disabled={!value.trim()}
            className="mt-4 w-full rounded-full bg-foreground py-3.5 text-sm font-medium text-background transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {editing ? "更新稱呼" : "開始逛逛 →"}
          </button>
        </form>

        <button
          type="button"
          onClick={dismiss}
          className="mt-4 text-sm text-foreground/45 underline-offset-4 hover:text-foreground hover:underline"
        >
          {editing ? "取消" : "先略過"}
        </button>
      </div>
    </div>
  );
}
