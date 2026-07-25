"use client";

import { useState } from "react";
import { useName } from "./NameProvider";

const navItems = [
  { label: "芒果品種", href: "/#varieties", index: "01" },
  { label: "產地風土", href: "/#story", index: "02" },
  { label: "芒果誌", href: "/blog", index: "03" },
  { label: "小遊戲", href: "/game", index: "04" },
  { label: "搶先預約", href: "/#shop", index: "05" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { name, openPrompt } = useName();

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 sm:py-5">
        <a
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-baseline gap-2"
        >
          <span className="font-serif text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            日光芒果
          </span>
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.35em] text-foreground/40 sm:inline">
            Sunlit Mango
          </span>
        </a>

        {/* 桌機 / 平板：橫向導覽 */}
        <nav className="hidden items-center gap-5 md:flex lg:gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex items-center gap-1.5 text-sm text-foreground/70 transition-colors hover:text-foreground"
            >
              <span className="hidden text-[10px] font-medium text-foreground/30 group-hover:text-amber-700 lg:inline">
                {item.index}
              </span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          {name && (
            <button
              type="button"
              onClick={openPrompt}
              title="點擊更換稱呼"
              className="hidden text-sm text-foreground/60 transition hover:text-foreground lg:block"
            >
              嗨，<span className="font-medium text-foreground">{name}</span> 👋
            </button>
          )}
          <a
            href="/#shop"
            className="group flex items-center gap-2 text-sm font-medium text-foreground"
          >
            <span className="relative">
              加入名單
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-foreground transition-transform group-hover:scale-x-0" />
            </span>
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        {/* 手機：漢堡按鈕 */}
        <button
          type="button"
          aria-label={open ? "關閉選單" : "開啟選單"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-foreground transition-transform duration-300 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-foreground transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-foreground transition-transform duration-300 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* 手機：下拉選單 */}
      <div
        className={`overflow-hidden border-t border-foreground/10 bg-background/95 backdrop-blur-md transition-[max-height] duration-300 ease-out md:hidden ${
          open ? "max-h-80" : "max-h-0 border-t-0"
        }`}
      >
        <nav className="flex flex-col px-5 py-2">
          {name && (
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openPrompt();
              }}
              className="flex items-center gap-2 border-b border-foreground/5 py-4 text-left text-base text-foreground/80"
            >
              嗨，<span className="font-medium text-foreground">{name}</span> 👋
              <span className="ml-auto text-xs text-foreground/40">更換稱呼</span>
            </button>
          )}
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 border-b border-foreground/5 py-4 text-base text-foreground/80"
            >
              <span className="text-xs font-medium text-foreground/30">
                {item.index}
              </span>
              {item.label}
            </a>
          ))}
          <a
            href="/#shop"
            onClick={() => setOpen(false)}
            className="mt-4 mb-3 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
          >
            加入興趣名單 →
          </a>
        </nav>
      </div>
    </header>
  );
}
