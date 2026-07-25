import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/lib/posts";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "芒果誌 — 日光芒果",
  description: "關於芒果的選果、保存與產地故事，一起更懂這顆夏日的甜。",
};

function formatDate(d: string) {
  const [y, m, day] = d.split("-");
  return `${y} 年 ${Number(m)} 月 ${Number(day)} 日`;
}

export default function BlogPage() {
  return (
    <div id="top" className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:py-24">
      {/* 標題區 */}
      <Reveal>
        <div className="border-b border-foreground/15 pb-8">
          <div className="text-xs font-medium uppercase tracking-[0.3em] text-foreground/50">
            Journal
          </div>
          <h1 className="mt-4 font-serif text-4xl text-foreground sm:text-5xl lg:text-6xl">
            芒果誌
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-foreground/70 sm:text-lg">
            關於選果、保存與產地的二三事——把每一顆芒果，吃得更懂、更甜。
          </p>
        </div>
      </Reveal>

      {/* 文章列表 */}
      <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 100} className="group">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-foreground/10">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-md">
                  {post.tag}
                </span>
              </div>
              <div className="mt-5 flex items-center gap-3 text-xs text-foreground/45">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="text-foreground/25">·</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="mt-2 font-serif text-2xl leading-snug text-foreground transition-colors group-hover:text-amber-800">
                {post.title}
              </h2>
              <p className="mt-3 line-clamp-3 leading-7 text-foreground/65">
                {post.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-amber-800">
                閱讀全文
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
