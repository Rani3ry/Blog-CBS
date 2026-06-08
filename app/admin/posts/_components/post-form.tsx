"use client";

import Link from "next/link";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useState } from "react";
import { createPost, updatePost } from "@/app/admin/posts/actions";
import { ImageUploadField } from "@/app/admin/posts/_components/image-upload-field";

type PostFormProps = {
  post?: {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    imageUrl: string | null;
    published: boolean;
  };
};

export function PostForm({ post }: PostFormProps) {
  const isEditing = Boolean(post);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  return (
    <form
      action={isEditing ? updatePost : createPost}
      className="grid gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      {post ? <input type="hidden" name="id" value={post.id} /> : null}

      <ImageUploadField
        initialImageUrl={post?.imageUrl}
        title={post?.title}
        onUploadingChange={setIsUploadingImage}
      />

      <div className="grid gap-2">
        <label htmlFor="title" className="text-sm font-semibold text-slate-700">
          Titulo
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={post?.title}
          className="h-11 rounded-md border border-slate-300 px-3 outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
        />
      </div>

      <div className="grid gap-2">
        <label
          htmlFor="excerpt"
          className="text-sm font-semibold text-slate-700"
        >
          Resumo
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={3}
          defaultValue={post?.excerpt}
          className="resize-y rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
        />
      </div>

      <div className="grid gap-2">
        <label
          htmlFor="content"
          className="text-sm font-semibold text-slate-700"
        >
          Conteudo
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={12}
          defaultValue={post?.content}
          className="resize-y rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
        />
      </div>

      <label className="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-medium text-slate-700">
        <input
          name="published"
          type="checkbox"
          defaultChecked={post?.published}
          className="size-4 rounded border-slate-300 accent-teal-700"
        />
        Publicado
      </label>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between">
        <Link
          href="/admin/posts"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Voltar
        </Link>
        <button
          type="submit"
          disabled={isUploadingImage}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {isUploadingImage ? (
            <Loader2 size={16} aria-hidden="true" className="animate-spin" />
          ) : (
            <Save size={16} aria-hidden="true" />
          )}
          {isUploadingImage ? "Aguardando imagem" : "Salvar"}
        </button>
      </div>
    </form>
  );
}
