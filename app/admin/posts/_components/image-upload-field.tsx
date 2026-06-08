"use client";

import Image from "next/image";
import { ImagePlus, Loader2 } from "lucide-react";
import { useId, useState } from "react";

type ImageUploadFieldProps = {
  initialImageUrl?: string | null;
  title?: string;
  onUploadingChange?: (isUploading: boolean) => void;
};

export function ImageUploadField({
  initialImageUrl,
  title,
  onUploadingChange,
}: ImageUploadFieldProps) {
  const id = useId();
  const [imageUrl, setImageUrl] = useState(initialImageUrl ?? "");
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  function setUploading(value: boolean) {
    setIsUploading(value);
    onUploadingChange?.(value);
  }

  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setStatus("Envie apenas arquivos de imagem.");
      return;
    }

    const maxFileSize = 5 * 1024 * 1024;

    if (file.size > maxFileSize) {
      setStatus("A imagem deve ter no maximo 5MB.");
      return;
    }

    setUploading(true);
    setStatus("Enviando imagem...");

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("image", file);

      const response = await fetch("/api/uploads/post-image", {
        method: "POST",
        body: uploadFormData,
      });
      const result = (await response.json()) as {
        imageUrl?: string;
        error?: string;
      };

      if (!response.ok || !result.imageUrl) {
        throw new Error(result.error || "Nao foi possivel enviar a imagem.");
      }

      setImageUrl(result.imageUrl);
      setStatus("Imagem enviada.");
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Nao foi possivel enviar a imagem.",
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid gap-3">
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        Imagem do post
      </label>
      {imageUrl ? (
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
          <Image
            src={imageUrl}
            alt={title || "Imagem do post"}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      ) : null}
      <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center transition hover:border-teal-700 hover:bg-teal-50">
        {isUploading ? (
          <Loader2
            size={24}
            aria-hidden="true"
            className="animate-spin text-teal-700"
          />
        ) : (
          <ImagePlus size={24} aria-hidden="true" className="text-teal-700" />
        )}
        <span className="text-sm font-semibold text-slate-800">
          Selecionar imagem
        </span>
        <span className="text-sm text-slate-500">PNG, JPG ou WebP ate 5MB</span>
        <input
          id={id}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="sr-only"
          onChange={handleImageChange}
        />
      </label>
      <input type="hidden" name="imageUrl" value={imageUrl} />
      {status ? <p className="text-sm text-slate-600">{status}</p> : null}
    </div>
  );
}
