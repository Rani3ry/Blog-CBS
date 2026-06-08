import Link from "next/link";
import Image from "next/image";
import { Eye, Globe2, Pencil, Plus, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/posts";
import { deletePost } from "@/app/admin/posts/actions";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-teal-700">
              Area administrativa
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">
              Posts do blog
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-300 px-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
            >
              <Globe2 size={16} aria-hidden="true" />
              Site
            </Link>
            <Link
              href="/admin/posts/new"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-slate-950 px-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Plus size={16} aria-hidden="true" />
              Novo post
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6 py-8">
        {posts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
            <h2 className="text-xl font-semibold">Nenhum post cadastrado</h2>
            <p className="mt-2 text-slate-600">
              Comece criando o primeiro conteudo do blog.
            </p>
            <Link
              href="/admin/posts/new"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Plus size={16} aria-hidden="true" />
              Novo post
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-[1fr_auto] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600 md:grid-cols-[1fr_120px_140px_170px]">
              <span>Post</span>
              <span className="hidden md:block">Status</span>
              <span className="hidden md:block">Criado em</span>
              <span className="text-right">Acoes</span>
            </div>
            <div className="divide-y divide-slate-200">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="grid grid-cols-[1fr_auto] gap-3 px-4 py-4 md:grid-cols-[1fr_120px_140px_170px] md:items-center"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {post.imageUrl ? (
                      <div className="relative hidden size-14 shrink-0 overflow-hidden rounded-md bg-slate-100 sm:block">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    <div className="min-w-0">
                      <h2 className="truncate font-semibold text-slate-950">
                        {post.title}
                      </h2>
                      <p className="mt-1 line-clamp-1 text-sm text-slate-600">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                  <span className="hidden text-sm font-medium md:block">
                    {post.published ? "Publicado" : "Rascunho"}
                  </span>
                  <span className="hidden text-sm text-slate-600 md:block">
                    {formatDate(post.createdAt)}
                  </span>
                  <div className="flex items-center justify-end gap-2">
                    {post.published ? (
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex size-9 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                        title="Ver post"
                      >
                        <Eye size={16} aria-hidden="true" />
                      </Link>
                    ) : null}
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="inline-flex size-9 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                      title="Editar post"
                    >
                      <Pencil size={16} aria-hidden="true" />
                    </Link>
                    <form action={deletePost}>
                      <input type="hidden" name="id" value={post.id} />
                      <button
                        type="submit"
                        className="inline-flex size-9 items-center justify-center rounded-md border border-red-200 text-red-700 transition hover:border-red-700 hover:bg-red-50"
                        title="Excluir post"
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </form>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
