import { PrismaClient } from '@prisma/client'

// Fix for broken global.localStorage in some environments (like Next.js 15 SSR)
if (typeof window === 'undefined' && typeof globalThis !== 'undefined') {
  const g = globalThis as any;
  // Cria um mock seguro de localStorage para o servidor
  const localStorageMock = {
    getItem: () => null,
    setItem: () => { },
    removeItem: () => { },
    clear: () => { },
    key: () => null,
    length: 0
  };

  try {
    if (!g.localStorage || typeof g.localStorage?.getItem !== 'function') {
      Object.defineProperty(g, 'localStorage', {
        value: localStorageMock,
        configurable: true,
        writable: true
      });
    }
  } catch (e) {
    // Ignora erros de definição de propriedade
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db