"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { assertAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { createUniqueSlug, getPostFormValue } from "@/lib/posts";

function validatePostFields(formData: FormData) {
  const title = getPostFormValue(formData, "title");
  const excerpt = getPostFormValue(formData, "excerpt");
  const content = getPostFormValue(formData, "content");
  const imageUrl = getPostFormValue(formData, "imageUrl") || null;
  const published = formData.get("published") === "on";

  if (!title || !excerpt || !content) {
    throw new Error("Titulo, resumo e conteudo sao obrigatorios.");
  }

  return { title, excerpt, content, imageUrl, published };
}

export async function createPost(formData: FormData) {
  await assertAdminSession();

  const data = validatePostFields(formData);
  const slug = await createUniqueSlug(data.title);

  const post = await prisma.post.create({
    data: {
      ...data,
      slug,
    },
    select: {
      id: true,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/posts");
  redirect(`/admin/posts/${post.id}/edit`);
}

export async function updatePost(formData: FormData) {
  await assertAdminSession();

  const id = Number(getPostFormValue(formData, "id"));

  if (!Number.isInteger(id)) {
    throw new Error("Post invalido.");
  }

  const data = validatePostFields(formData);
  const slug = await createUniqueSlug(data.title, id);
  const currentPost = await prisma.post.findUnique({
    where: { id },
    select: { slug: true },
  });

  await prisma.post.update({
    where: { id },
    data: {
      ...data,
      slug,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${id}/edit`);
  if (currentPost) {
    revalidatePath(`/blog/${currentPost.slug}`);
  }
  revalidatePath(`/blog/${slug}`);
  redirect("/admin/posts");
}

export async function deletePost(formData: FormData) {
  await assertAdminSession();

  const id = Number(getPostFormValue(formData, "id"));

  if (!Number.isInteger(id)) {
    throw new Error("Post invalido.");
  }

  await prisma.post.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}
