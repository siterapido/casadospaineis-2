import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Polyfill para localStorage no ambiente de borda/servidor
const localStorageMock = {
  getItem: () => null,
  setItem: () => { },
  removeItem: () => { },
  clear: () => { },
  key: () => null,
  length: 0
};

try {
  if (typeof globalThis !== 'undefined') {
    const g = globalThis as any;
    if (!g.localStorage || typeof g.localStorage?.getItem !== 'function') {
      Object.defineProperty(g, 'localStorage', {
        value: localStorageMock,
        configurable: true,
        enumerable: true,
        writable: true
      });
    }
  }
} catch (e) {
  // Ignora erros de definição no Edge Runtime
}

// Definir rotas públicas
const isPublicRoute = createRouteMatcher([
  "/",
  "/courses",
  "/courses/(.*)",
  "/categories/(.*)",
  "/login",
  "/register",
  "/api/(.*)",
  "/setup",
  "/about",
  "/contact",
  "/faq",
  "/terms",
  "/privacy"
]);

// Definir rotas administrativas (requer admin)
const isAdminRoute = createRouteMatcher([
  "/admin",
  "/admin/(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  // Rotas públicas não requerem autenticação
  if (isPublicRoute(req)) {
    return;
  }

  // Verificar autenticação e rotas administrativas
  if (isAdminRoute(req)) {
    await auth.protect();
    // Aqui você pode adicionar lógica de verificação de admin se desejar
    return;
  }

  // Todas as outras rotas são protegidas
  await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

