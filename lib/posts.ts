import { prisma } from "@/lib/prisma";

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createUniqueSlug(title: string, postId?: number) {
  const baseSlug = slugify(title) || "post";
  let slug = baseSlug;
  let suffix = 1;

  while (
    await prisma.post.findFirst({
      where: {
        slug,
        ...(postId ? { id: { not: postId } } : {}),
      },
      select: { id: true },
    })
  ) {
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }

  return slug;
}

export function getPostFormValue(formData: FormData, field: string) {
  const value = formData.get(field);

  if (typeof value !== "string") {
    throw new Error(`Campo invalido: ${field}`);
  }

  return value.trim();
}
