import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-slate-200">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Voltar
          </Link>
          <Link
            href="/admin/posts"
            className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
          >
            <LayoutDashboard size={16} aria-hidden="true" />
            Admin
          </Link>
        </div>
      </header>

      <article className="mx-auto w-full max-w-4xl px-6 py-14">
        <time className="text-sm font-semibold text-teal-700">
          {formatDate(post.createdAt)}
        </time>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-6 text-xl leading-9 text-slate-600">{post.excerpt}</p>
        {post.imageUrl ? (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-lg bg-slate-100">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
        ) : null}
        <div className="mt-10 whitespace-pre-wrap border-t border-slate-200 pt-10 text-lg leading-9 text-slate-800">
          {post.content}
        </div>
      </article>
    </main>
  );
}
