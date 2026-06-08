import { NextResponse, type NextRequest } from "next/server";

const ADMIN_COOKIE = "admin_session";

function unauthorized() {
  return new NextResponse("Autenticacao obrigatoria.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

function getBasicCredentials(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Basic ")) {
    return null;
  }

  try {
    const decoded = atob(authorization.slice("Basic ".length));
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex === -1) {
      return null;
    }

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1),
    };
  } catch {
    return null;
  }
}

function hasAdminSession(request: NextRequest) {
  const sessionToken = process.env.ADMIN_SESSION_TOKEN;

  return Boolean(
    sessionToken && request.cookies.get(ADMIN_COOKIE)?.value === sessionToken,
  );
}

function hasBasicAuth(request: NextRequest) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const credentials = getBasicCredentials(request);

  return Boolean(
    username &&
      password &&
      credentials?.username === username &&
      credentials.password === password,
  );
}

export function proxy(request: NextRequest) {
  const sessionToken = process.env.ADMIN_SESSION_TOKEN;

  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !sessionToken) {
    return new NextResponse("Autenticacao do admin nao configurada.", {
      status: 503,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }

  if (hasAdminSession(request)) {
    return NextResponse.next();
  }

  if (!hasBasicAuth(request)) {
    return unauthorized();
  }

  const response = NextResponse.next();
  response.cookies.set({
    name: ADMIN_COOKIE,
    value: sessionToken,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/uploads/post-image"],
};
