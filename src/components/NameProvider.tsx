"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type NameCtx = {
  name: string;
  ready: boolean; // localStorage 是否已載入（避免載入前閃現 modal）
  promptOpen: boolean; // 是否手動開啟輸入框（改稱呼）
  skipped: boolean; // 本次進站是否略過
  saveName: (n: string) => void;
  openPrompt: () => void;
  dismiss: () => void;
};

const Ctx = createContext<NameCtx | null>(null);

export function useName() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useName 必須在 NameProvider 內使用");
  return c;
}

const KEY_NAME = "dw_name";

export default function NameProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState("");
  const [ready, setReady] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);
  const [skipped, setSkipped] = useState(false);

  // 掛載後從 localStorage 讀取稱呼
  useEffect(() => {
    try {
      setName(localStorage.getItem(KEY_NAME) ?? "");
    } catch {
      // localStorage 不可用時略過
    }
    setReady(true);
  }, []);

  const saveName = (n: string) => {
    const trimmed = n.trim().slice(0, 20);
    if (!trimmed) return;
    setName(trimmed);
    setSkipped(false);
    setPromptOpen(false);
    try {
      localStorage.setItem(KEY_NAME, trimmed); // 存起來，下次直接顯示
    } catch {}
  };

  const openPrompt = () => setPromptOpen(true);

  const dismiss = () => {
    setPromptOpen(false);
    if (!name) setSkipped(true); // 略過後本次不再跳出
  };

  return (
    <Ctx.Provider
      value={{ name, ready, promptOpen, skipped, saveName, openPrompt, dismiss }}
    >
      {children}
    </Ctx.Provider>
  );
}
