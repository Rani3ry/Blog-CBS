import { NextResponse } from "next/server";
import { assertAdminSession } from "@/lib/admin-auth";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await assertAdminSession();

    const formData = await request.formData();
    const file = formData.get("image");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { error: "Nenhuma imagem enviada." },
        { status: 400 },
      );
    }

    const imageUrl = await uploadImageToCloudinary(file);

    return NextResponse.json({ imageUrl });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Nao foi possivel enviar a imagem.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
