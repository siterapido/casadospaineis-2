/**
 * Configuração de Branding - Casa dos Painéis
 * Centraliza identidade visual da plataforma
 */

export const BRANDING = {
  // Informações Básicas
  name: "Casa dos Painéis",
  tagline: "Transforme sua carreira com energia solar",
  description: "Plataforma de cursos online especializada em energia solar e painéis fotovoltaicos",

  // URLs de Assets
  logo: {
    light: "/logo.svg",
    dark: "/logo-dark.svg",
    compact: "/logo-compact.svg",
    favicon: "/favicon.ico",
  },

  // Paleta de Cores (Design System)
  colors: {
    primary: "#F59E0B",      // Amarelo solar (amber-500)
    primaryDark: "#D97706",   // amber-600
    secondary: "#1E40AF",     // Azul céu (blue-800)
    secondaryLight: "#3B82F6", // blue-500
    accent: "#10B981",        // Verde sustentável (emerald-500)
    sidebar: "#1E293B",       // Slate-800
    sidebarText: "#F8FAFC",   // Slate-50
  },

  // SEO e Metadata
  seo: {
    title: "Casa dos Painéis - Cursos de Energia Solar",
    description: "Aprenda tudo sobre energia solar fotovoltaica com especialistas. Cursos práticos de instalação, dimensionamento e manutenção de painéis solares.",
    keywords: [
      "Casa dos Painéis",
      "Energia Solar",
      "Painéis Fotovoltaicos",
      "Cursos Online",
      "Instalação Solar",
      "Dimensionamento Fotovoltaico",
      "Sustentabilidade",
      "LMS",
    ],
    ogImage: "/og-image.png",
  },

  // Contato e Social
  contact: {
    email: "contato@casadospaineis.com.br",
    phone: "+55 (XX) XXXXX-XXXX",
    whatsapp: "5511999999999",
  },

  social: {
    instagram: "https://instagram.com/casadospaineis",
    youtube: "https://youtube.com/@casadospaineis",
    linkedin: "https://linkedin.com/company/casadospaineis",
  },

  // Configurações Técnicas
  vercel: {
    domain: "casadospaineis.vercel.app",
    customDomain: "cursos.casadospaineis.com.br", // Opcional
  },
} as const;

export type BrandingConfig = typeof BRANDING;
