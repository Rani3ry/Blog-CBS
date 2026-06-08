import Link from "next/link";
import Image from "next/image";
import { ArrowRight, LayoutDashboard, PenLine } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            Blog Projeto Final
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

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1fr_320px] md:items-end">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-md bg-teal-50 px-3 py-1 text-sm font-medium text-teal-800">
              <PenLine size={16} aria-hidden="true" />
              Publicacoes do blog
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
              Ideias, artigos e novidades em um blog conectado ao banco.
            </h1>
          </div>
          <p className="text-lg leading-8 text-slate-600">
            Os posts publicados pelo painel administrativo aparecem aqui
            automaticamente usando Prisma e MySQL.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-10">
        {posts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
            <h2 className="text-xl font-semibold">Nenhum post publicado</h2>
            <p className="mt-2 text-slate-600">
              Crie um post no admin e marque como publicado para ele aparecer.
            </p>
            <Link
              href="/admin/posts/new"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <PenLine size={16} aria-hidden="true" />
              Novo post
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.id}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
              >
                {post.imageUrl ? (
                  <div className="relative aspect-[16/9] bg-slate-100">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <time className="text-sm font-medium text-teal-700">
                    {formatDate(post.createdAt)}
                  </time>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                    {post.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 leading-7 text-slate-600">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition hover:text-teal-700"
                  >
                    Ler post
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
