"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // 驗證 email 格式，通過才回覆「敬請期待」（不做儲存）
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  }

  // 成功後以確認訊息取代表單
  if (status === "success") {
    return (
      <div className="mx-auto mt-10 max-w-md rounded-2xl border border-amber-700/30 bg-white/50 p-8 text-center backdrop-blur-md">
        <div className="text-4xl">🥭</div>
        <p className="mt-4 font-serif text-xl text-foreground">
          感謝你的興趣！
        </p>
        <p className="mt-2 text-sm leading-6 text-foreground/60">
          我們正在為你準備最甜的玉井芒果，
          <br />
          敬請期待我們的好消息 🎉
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-amber-800 underline-offset-4 hover:underline"
        >
          再登記一個 Email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-xl" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="you@example.com"
          aria-label="Email 地址"
          aria-invalid={status === "error"}
          className="h-14 flex-1 rounded-full border border-foreground/15 bg-white/60 px-6 text-base text-foreground outline-none backdrop-blur-md transition placeholder:text-foreground/35 focus:border-amber-700/50 focus:ring-2 focus:ring-amber-700/20"
        />
        <button
          type="submit"
          className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-foreground px-8 text-sm font-medium text-background transition hover:bg-amber-800"
        >
          加入興趣名單
          <span>→</span>
        </button>
      </div>

      <div className="mt-3 min-h-[1.25rem] px-2 text-sm" aria-live="polite">
        {status === "error" ? (
          <span className="text-red-700">請輸入有效的 Email 地址</span>
        ) : (
          <span className="text-foreground/45">
            留下 Email，開賣時我們會第一時間通知你，敬請期待好消息！
          </span>
        )}
      </div>
    </form>
  );
}
