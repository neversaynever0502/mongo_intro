import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/lib/posts";

// 預先產生三篇文章的靜態路徑
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "找不到文章 — 日光芒果" };
  return {
    title: `${post.title} — 芒果誌`,
    description: post.excerpt,
  };
}

function formatDate(d: string) {
  const [y, m, day] = d.split("-");
  return `${y} 年 ${Number(m)} 月 ${Number(day)} 日`;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-6 lg:py-24">
      {/* 返回連結 */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-foreground/60 transition hover:text-foreground"
      >
        <span>←</span> 回到芒果誌
      </Link>

      {/* 標題區 */}
      <header className="mt-8">
        <div className="flex items-center gap-3 text-xs text-foreground/45">
          <span className="rounded-full border border-foreground/10 bg-white/40 px-3 py-1 font-medium text-foreground/60 backdrop-blur-md">
            {post.tag}
          </span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="text-foreground/25">·</span>
          <span>{post.readTime}</span>
        </div>
        <h1 className="mt-5 font-serif text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-foreground/70">
          {post.excerpt}
        </p>
      </header>

      {/* 封面圖 */}
      <div className="relative mt-10 aspect-[3/2] overflow-hidden rounded-2xl border border-foreground/10">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>

      {/* 內文 */}
      <div className="mt-12">
        {post.content.map((section, i) => (
          <section key={i} className="mb-9">
            {section.heading && (
              <h2 className="mb-4 font-serif text-2xl text-foreground">
                {section.heading}
              </h2>
            )}
            {section.body.map((para, j) => (
              <p
                key={j}
                className="mb-4 text-[1.05rem] leading-8 text-foreground/80"
              >
                {para}
              </p>
            ))}
          </section>
        ))}
      </div>

      {/* 文末行動呼籲 */}
      <div className="mt-8 rounded-2xl border border-amber-700/25 bg-white/50 p-8 text-center backdrop-blur-md">
        <p className="font-serif text-xl text-foreground">
          想嚐嚐玉井樹上熟的愛文嗎？
        </p>
        <p className="mt-2 text-sm text-foreground/60">
          芒果即將開賣，留下 Email 搶先收到通知。
        </p>
        <Link
          href="/#shop"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition hover:bg-amber-800"
        >
          加入興趣名單 →
        </Link>
      </div>
    </article>
  );
}
