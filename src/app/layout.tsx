import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { BRANDING } from "@/config/branding";

// Polyfill para localStorage no lado do servidor
const localStorageMock = {
  getItem: () => null,
  setItem: () => { },
  removeItem: () => { },
  clear: () => { },
  key: () => null,
  length: 0
};

try {
  if (typeof window === 'undefined' && typeof globalThis !== 'undefined') {
    const g = globalThis as any;
    if (!g.localStorage || typeof g.localStorage?.getItem !== 'function') {
      Object.defineProperty(g, 'localStorage', {
        value: localStorageMock,
        configurable: true,
        writable: true
      });
    }
  }
} catch (e) {
  // Ignora erros de definição de propriedade
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: BRANDING.seo.title,
  description: BRANDING.seo.description,
  keywords: BRANDING.seo.keywords,
  authors: [{ name: "Casa dos Painéis Team" }],
  icons: {
    icon: BRANDING.logo.favicon,
  },
  openGraph: {
    title: BRANDING.seo.title,
    description: BRANDING.seo.description,
    images: [BRANDING.seo.ogImage],
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: BRANDING.seo.title,
    description: BRANDING.seo.description,
    images: [BRANDING.seo.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
