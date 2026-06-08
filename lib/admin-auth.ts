import { cookies } from "next/headers";

const ADMIN_COOKIE = "admin_session";

export async function assertAdminSession() {
  const sessionToken = process.env.ADMIN_SESSION_TOKEN;
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE)?.value;

  if (!sessionToken || sessionCookie !== sessionToken) {
    throw new Error("Nao autorizado.");
  }
}
