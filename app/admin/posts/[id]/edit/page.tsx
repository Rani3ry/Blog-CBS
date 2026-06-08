import { notFound } from "next/navigation";
import { PostForm } from "@/app/admin/posts/_components/post-form";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = Number(id);

  if (!Number.isInteger(postId)) {
    notFound();
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: {
      id: true,
      title: true,
      excerpt: true,
      content: true,
      imageUrl: true,
      published: true,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-3xl px-6 py-10">
        <p className="text-sm font-semibold text-teal-700">
          Area administrativa
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Editar post
        </h1>
        <div className="mt-8">
          <PostForm post={post} />
        </div>
      </div>
    </main>
  );
}
