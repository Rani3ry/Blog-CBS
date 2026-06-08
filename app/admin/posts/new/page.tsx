import { PostForm } from "@/app/admin/posts/_components/post-form";

export default function NewPostPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-3xl px-6 py-10">
        <p className="text-sm font-semibold text-teal-700">
          Area administrativa
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Novo post
        </h1>
        <div className="mt-8">
          <PostForm />
        </div>
      </div>
    </main>
  );
}
