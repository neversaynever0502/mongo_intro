const columns = [
  { title: "芒果", links: ["愛文芒果", "金煌芒果", "玉文芒果", "夏雪芒果"] },
  { title: "服務", links: ["宅配訂購", "企業送禮", "常見問題", "退換貨"] },
  { title: "聯絡", links: ["客服中心", "果園位置", "加入會員", "合作提案"] },
];

export default function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-background">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* 品牌 */}
          <div className="lg:col-span-5">
            <div className="font-serif text-3xl font-medium text-foreground">
              日光芒果
            </div>
            <p className="mt-4 max-w-sm leading-7 text-foreground/60">
              來自台南玉井的樹上熟成芒果，套袋限產、產季直送，
              把北回歸線的整季陽光，濃縮成一顆濃郁的甜。
            </p>
            <div className="mt-6 flex gap-6 text-sm text-foreground/50">
              {["Instagram", "Facebook", "LINE"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="underline-offset-4 transition hover:text-foreground hover:underline"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* 連結欄位 */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 lg:col-span-7">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/40">
                  {col.title}
                </h3>
                <ul className="mt-5 space-y-3 text-sm text-foreground/70">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="underline-offset-4 transition hover:text-foreground hover:underline"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-foreground/10 pt-6 text-xs text-foreground/45 sm:flex-row sm:items-center">
          <p>© 2026 日光芒果 Sunlit Mango．台南玉井・樹上熟成</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">
              隱私權政策
            </a>
            <a href="#" className="hover:text-foreground">
              服務條款
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
