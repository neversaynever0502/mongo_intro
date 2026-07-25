"use client";

import { useName } from "./NameProvider";

export default function WelcomeGreeting() {
  const { name } = useName();
  if (!name) return null;

  return (
    <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-700/25 bg-amber-50/60 px-4 py-1.5 text-sm font-medium text-amber-900 backdrop-blur-md">
      👋 {name}，歡迎光臨日光芒果！
    </p>
  );
}
