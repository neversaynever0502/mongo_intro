import Image from "next/image";
import Reveal from "@/components/Reveal";
import Parallax from "@/components/Parallax";
import WaitlistForm from "@/components/WaitlistForm";
import WelcomeGreeting from "@/components/WelcomeGreeting";

const varieties = [
  {
    no: "01",
    name: "愛文芒果促銷",
    en: "Irwin",
    img: "/images/mango-unsplash-2.jpg",
    season: "6–7 月",
    origin: "台南・玉井",
    desc: "果皮豔紅、蜜香濃郁，果肉細緻無纖維，是台灣芒果的經典代表。",
  },
  {
    no: "02",
    name: "金煌芒果",
    en: "Jinhuang",
    img: "/images/mango-unsplash-3.jpg",
    season: "7–8 月",
    origin: "高雄・六龜",
    desc: "果實碩大、色澤金黃，甜度高而酸味低，一顆可重達兩台斤。",
  },
  {
    no: "03",
    name: "玉文芒果",
    en: "Yuwen",
    img: "/images/mango-unsplash-4.jpg",
    season: "7 月",
    origin: "台南・南化",
    desc: "愛文與金煌的雜交品種，兼具豔紅外表與細緻口感，纖維更少。",
  },
  {
    no: "04",
    name: "夏雪芒果",
    en: "Xiaxue",
    img: "/images/mango-unsplash-5.jpg",
    season: "7–8 月",
    origin: "台南・玉井",
    desc: "晚生的珍稀品種，帶奶香般的柔甜，入口綿密如冰淇淋。",
  },
];

export default function Home() {
  return (
    <div id="top">
      {/* ── Hero ───────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 pt-12 pb-16 sm:px-6 sm:pt-20 lg:pt-24 lg:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <WelcomeGreeting />
            <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.3em] text-foreground/50">
              <span className="h-px w-10 bg-foreground/30" />
              臺灣 · 玉井日光
            </div>
            <h1 className="mt-6 font-serif text-4xl font-medium leading-[1.12] tracking-tight text-foreground sm:mt-8 sm:text-6xl lg:text-7xl">
              全日照的陽光，
              <br />
              釀成<span className="italic text-amber-700">一顆芒果</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-foreground/70 sm:mt-8 sm:text-lg sm:leading-8">
              北回歸線上的玉井，日照充足、日夜溫差大，孕育出蜜香濃郁的頂級芒果。
              我們只在最甜的那幾天採收，樹上熟、產地直送到你手中。
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <a
                href="#shop"
                className="group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition hover:bg-amber-800"
              >
                搶先加入名單
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#varieties"
                className="text-sm font-medium text-foreground/70 underline-offset-4 hover:text-foreground hover:underline"
              >
                認識四種芒果
              </a>
            </div>
          </Reveal>

          {/* 主視覺照片（滾動視差）*/}
          <Reveal delay={120} className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-foreground/10">
              {/* 圖層比外框高，隨捲動位移也不會露出邊緣 */}
              <Parallax speed={0.1} className="absolute inset-x-0 -top-[14%] h-[128%]">
                <div className="relative h-full w-full">
                  <Image
                    src="/images/mango-unsplash-1.jpg"
                    alt="枝頭上帶著露水的成熟愛文芒果"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </Parallax>
              <div className="absolute bottom-4 left-4 rounded-full bg-background/80 px-4 py-1.5 text-xs font-medium text-foreground backdrop-blur-md">
                🥭 本季首採・樹上熟愛文
              </div>
            </div>
          </Reveal>
        </div>

        {/* 底部數據列 */}
        <div className="mt-14 grid grid-cols-3 gap-4 border-t border-foreground/10 pt-8 sm:mt-20 sm:gap-8">
          {[
            { num: "18", suffix: "°Brix", label: "平均甜度上看 18 度" },
            { num: "30", suffix: "年", label: "玉井契作果園經驗" },
            { num: "24", suffix: "小時", label: "採收後直送到府" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="font-serif text-3xl text-foreground sm:text-4xl lg:text-5xl">
                {s.num}
                <span className="text-base text-foreground/50 sm:text-xl">
                  {s.suffix}
                </span>
              </div>
              <div className="mt-2 text-xs text-foreground/60 sm:text-sm">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 芒果品種 ───────────────────────── */}
      <section id="varieties" className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <div className="flex items-end justify-between border-b border-foreground/15 pb-6">
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.3em] text-foreground/50">
                Varieties
              </div>
              <h2 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl lg:text-5xl">
                四種當季芒果
              </h2>
            </div>
            <span className="hidden font-serif text-sm italic text-foreground/50 sm:block">
              從初夏到盛夏，甜味接力登場
            </span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 sm:gap-y-14 lg:mt-12 lg:grid-cols-4">
          {varieties.map((v, i) => (
            <Reveal key={v.name} delay={i * 100} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-foreground/10">
                <Image
                  src={v.img}
                  alt={`${v.name}（${v.en}）`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 font-serif text-sm text-white/90 drop-shadow">
                  {v.no}
                </span>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-2">
                <h3 className="font-serif text-2xl text-foreground sm:text-3xl lg:text-2xl">
                  {v.name}
                </h3>
                <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 lg:text-xs">
                  {v.en}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-foreground/55">
                <span>產季 {v.season}</span>
                <span className="text-foreground/30">|</span>
                <span>{v.origin}</span>
              </div>
              <p className="mt-3 leading-7 text-foreground/70">{v.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 產地風土（固定背景視差）───────────── */}
      <section id="story" className="relative overflow-hidden border-y border-foreground/10">
        {/* 固定背景圖：桌機用 bg-fixed 製造視差，行動裝置改用一般捲動避免 iOS 破圖 */}
        <div className="absolute inset-0 bg-[url('/images/mango-unsplash-2.jpg')] bg-cover bg-center bg-scroll md:bg-fixed" />
        <div className="absolute inset-0 bg-amber-950/85" />

        <div className="relative mx-auto grid max-w-6xl gap-8 px-5 py-20 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:py-32">
          <Reveal className="lg:col-span-4">
            <div className="text-xs font-medium uppercase tracking-[0.3em] text-amber-200/60">
              Terroir · 玉井
            </div>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-amber-50 sm:text-4xl lg:text-5xl">
              芒果的故鄉，
              <br />
              就在玉井
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-8 lg:pl-12">
            <p className="font-serif text-xl leading-relaxed text-amber-50/90 sm:text-2xl lg:text-3xl">
              「甜，是陽光、土地與農人一整年的默契。」
            </p>
            <p className="mt-6 max-w-2xl leading-7 text-amber-100/70 sm:mt-8 sm:leading-8">
              台南玉井位處北回歸線，午後陽光炙烈、入夜山風轉涼，劇烈的日夜溫差
              讓芒果把甜份牢牢鎖進果肉。我們的果園採套袋管理、限制產量，
              只讓每一顆在樹上完全成熟才採收——這是玉井芒果之所以濃郁的祕密。
            </p>
            <div className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
              {[
                { k: "海拔", v: "80–300 m" },
                { k: "栽培", v: "套袋・限產" },
                { k: "採收", v: "樹上熟成" },
              ].map((item) => (
                <div key={item.k}>
                  <div className="text-xs uppercase tracking-[0.2em] text-amber-200/50">
                    {item.k}
                  </div>
                  <div className="mt-1 font-serif text-2xl text-amber-50">
                    {item.v}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 興趣名單（尚未開賣）─────────────── */}
      <section id="shop" className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:py-28">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-medium uppercase tracking-[0.3em] text-amber-800">
              Coming Soon · 即將開賣
            </div>
            <h2 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl lg:text-5xl">
              想搶第一箱樹上熟愛文嗎？
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-foreground/70 sm:text-lg sm:leading-8">
              今年的芒果還在枝頭慢慢熟成。留下你的 Email，加入興趣名單，
              開賣的那一刻，我們會第一時間通知你，還有搶先預購的專屬優惠。
            </p>

            <WaitlistForm />

            {/* 即將推出的品種預告 */}
            <div className="mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-foreground/50">
              <span className="text-xs uppercase tracking-[0.2em] text-foreground/35">
                首波品種
              </span>
              {varieties.map((v) => (
                <span
                  key={v.name}
                  className="rounded-full border border-foreground/10 bg-white/40 px-3 py-1 backdrop-blur-md"
                >
                  {v.name}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
