import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

cloudinary.config({
  secure: true,
});

export async function uploadImageToCloudinary(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Envie apenas arquivos de imagem.");
  }

  const maxFileSize = 5 * 1024 * 1024;

  if (file.size > maxFileSize) {
    throw new Error("A imagem deve ter no maximo 5MB.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "blog",
        resource_type: "image",
        use_filename: true,
        unique_filename: true,
        overwrite: false,
      },
      (error, result?: UploadApiResponse) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result?.secure_url) {
          reject(new Error("Cloudinary nao retornou a URL da imagem."));
          return;
        }

        resolve(result.secure_url);
      },
    );

    uploadStream.end(buffer);
  });
}
