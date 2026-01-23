# Plano: Desativação do Modo White Label
## Foco: Plataforma Casa dos Painéis - Produção Vercel

**Data:** 2026-01-23
**Objetivo:** Desativar funcionalidades white label e preparar plataforma dedicada Casa dos Painéis para produção na Vercel

---

## 🎯 Objetivos do Plano

### Principais
1. **Remover infraestrutura white label não utilizada** do código
2. **Consolidar branding Casa dos Painéis** em toda aplicação
3. **Preparar deploy Vercel** com configurações otimizadas
4. **Manter possibilidade de reativação futura** do white label

### Não-Objetivos
- ❌ Deletar permanentemente código white label
- ❌ Modificar funcionalidades core do LMS
- ❌ Alterar estrutura de autenticação (Clerk)

---

## 📋 Inventário Atual White Label

### ✅ Componentes Implementados
- **Schema Prisma:** Modelo `tenant_settings` (linhas 182-203)
- **Campos:** name, logos, cores, custom_scripts, domain, slug
- **Índices:** domain, slug para multi-tenant routing

### ❌ Componentes NÃO Implementados
- API routes para gerenciar tenant_settings
- UI de configuração white label no admin
- Middleware de roteamento por domain/slug
- Aplicação dinâmica de temas/cores
- Environment variables para tenant
- Lógica de multi-tenant na aplicação

### 🔍 Status: **0% de implementação no código**
O modelo existe no banco, mas não há código funcional usando-o.

---

## 🛠️ Plano de Execução

### **FASE 1: Backup e Documentação** ⏱️ Estimativa: 30min

#### 1.1 Criar Branch de Feature
```bash
git checkout -b feature/disable-white-label
```

#### 1.2 Documentar Modelo White Label
- Exportar definição do `tenant_settings` para `.context/archived/`
- Criar `.context/archived/white-label-schema.prisma` com o modelo
- Documentar em `.context/archived/white-label-reativacao.md` como reativar

#### 1.3 Backup do Estado Atual
```bash
# Backup do schema
cp prisma/schema.prisma .context/archived/schema-with-white-label.prisma

# Backup do .env.example
cp .env.example .context/archived/.env.example.backup
```

---

### **FASE 2: Ajustes no Banco de Dados** ⏱️ Estimativa: 20min

#### 2.1 Comentar Modelo tenant_settings
**Arquivo:** `prisma/schema.prisma` (linhas 182-203)

```prisma
// =====================================================
// WHITE LABEL - DESABILITADO (2026-01-23)
// Modelo preservado para reativação futura
// Ver: .context/archived/white-label-reativacao.md
// =====================================================
/*
model tenant_settings {
  id                  Int       @id @default(autoincrement())
  name                String    @default("Minha Plataforma") @db.VarChar(255)
  logo_url            String?
  favicon_url         String?
  primary_color       String?   @default("#2563eb") @db.VarChar(7)
  secondary_color     String?   @default("#1e40af") @db.VarChar(7)
  custom_scripts      String?
  created_at          DateTime? @default(now()) @db.Timestamp(6)
  updated_at          DateTime? @default(now()) @db.Timestamp(6)
  logo_dark_url       String?
  logo_compact_url    String?
  sidebar_color       String?   @default("#1e293b") @db.VarChar(7)
  sidebar_text_color  String?   @default("#f8fafc") @db.VarChar(7)
  accent_color        String?   @default("#2563eb") @db.VarChar(7)
  landing_page_config Json?
  slug                String?   @unique @db.VarChar(50)
  domain              String?   @unique @db.VarChar(255)

  @@index([domain], map: "idx_tenant_domain")
  @@index([slug], map: "idx_tenant_slug")
}
*/
```

#### 2.2 Criar Migration Comentada
```bash
# Gerar migration que remove a tabela (se existir no DB)
bun run prisma migrate dev --name disable_white_label_tenant_settings
```

**Nota:** Se a tabela não existe no banco de produção, esta etapa apenas atualiza o schema.

#### 2.3 Atualizar Cliente Prisma
```bash
bun run db:generate
```

---

### **FASE 3: Consolidação de Branding Casa dos Painéis** ⏱️ Estimativa: 1h

#### 3.1 Criar Arquivo de Configuração de Marca
**Novo arquivo:** `src/config/branding.ts`

```typescript
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
```

#### 3.2 Atualizar Layout Principal
**Arquivo:** `src/app/layout.tsx`

```typescript
import { BRANDING } from "@/config/branding";

export const metadata: Metadata = {
  title: BRANDING.seo.title,
  description: BRANDING.seo.description,
  keywords: BRANDING.seo.keywords,
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
```

#### 3.3 Atualizar Tailwind Config com Cores da Marca
**Arquivo:** `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";
import { BRANDING } from "./src/config/branding";

const config: Config = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: BRANDING.colors.primary,
          "primary-dark": BRANDING.colors.primaryDark,
          secondary: BRANDING.colors.secondary,
          "secondary-light": BRANDING.colors.secondaryLight,
          accent: BRANDING.colors.accent,
          sidebar: BRANDING.colors.sidebar,
          "sidebar-text": BRANDING.colors.sidebarText,
        },
      },
    },
  },
};

export default config;
```

#### 3.4 Criar CSS Variables Globais
**Arquivo:** `src/app/globals.css`

Adicionar após as importações Tailwind:

```css
@layer base {
  :root {
    /* Casa dos Painéis - Brand Colors */
    --brand-primary: 39 99% 48%;        /* #F59E0B - Amarelo Solar */
    --brand-primary-dark: 35 92% 44%;   /* #D97706 */
    --brand-secondary: 222 61% 41%;     /* #1E40AF - Azul Céu */
    --brand-secondary-light: 217 91% 60%; /* #3B82F6 */
    --brand-accent: 160 84% 39%;        /* #10B981 - Verde */
    --brand-sidebar: 215 28% 17%;       /* #1E293B */
    --brand-sidebar-text: 210 40% 98%;  /* #F8FAFC */
  }
}
```

#### 3.5 Atualizar Componentes de Logo
**Criar:** `src/components/branding/logo.tsx`

```typescript
import { BRANDING } from "@/config/branding";
import Image from "next/image";

interface LogoProps {
  variant?: "light" | "dark" | "compact";
  className?: string;
}

export function Logo({ variant = "light", className }: LogoProps) {
  const logoSrc = variant === "compact"
    ? BRANDING.logo.compact
    : BRANDING.logo[variant];

  return (
    <Image
      src={logoSrc}
      alt={BRANDING.name}
      width={180}
      height={40}
      className={className}
      priority
    />
  );
}
```

---

### **FASE 4: Environment Variables Vercel** ⏱️ Estimativa: 30min

#### 4.1 Atualizar .env.example
```bash
# ========================================
# Casa dos Painéis - Environment Variables
# ========================================

# Autenticação (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Banco de Dados (Neon PostgreSQL)
DATABASE_URL=postgresql://user:pass@ep-xxxxx.us-east-2.aws.neon.tech/neondb

# Aplicação
NEXT_PUBLIC_APP_NAME="Casa dos Painéis"
NEXT_PUBLIC_APP_URL=https://casadospaineis.vercel.app

# Analytics (Opcional)
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Uploadcare (se usar para uploads)
# NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY=xxxxx
# UPLOADCARE_SECRET_KEY=xxxxx

# ========================================
# WHITE LABEL (DESABILITADO - 2026-01-23)
# Para reativar, ver: .context/archived/white-label-reativacao.md
# ========================================
```

#### 4.2 Configurar Vercel Environment Variables
Adicionar no dashboard da Vercel:

**Production:**
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=[Clerk Production Key]
CLERK_SECRET_KEY=[Clerk Production Secret]
DATABASE_URL=[Neon Production URL]
NEXT_PUBLIC_APP_NAME=Casa dos Painéis
NEXT_PUBLIC_APP_URL=https://cursos.casadospaineis.com.br
```

**Preview/Development:**
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=[Clerk Test Key]
CLERK_SECRET_KEY=[Clerk Test Secret]
DATABASE_URL=[Neon Dev URL]
NEXT_PUBLIC_APP_NAME=Casa dos Painéis (Dev)
NEXT_PUBLIC_APP_URL=https://casadospaineis-dev.vercel.app
```

---

### **FASE 5: Otimizações para Produção Vercel** ⏱️ Estimativa: 45min

#### 5.1 Configurar next.config.ts para Vercel
**Arquivo:** `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output standalone para otimização Vercel
  output: "standalone",

  // Otimizações de imagem
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com", // Clerk avatars
      },
      {
        protocol: "https",
        hostname: "ucarecdn.com", // Uploadcare (se usar)
      },
    ],
  },

  // Experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },

  // Redirects (se necessário)
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },

  // Headers de segurança
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

#### 5.2 Criar vercel.json
**Novo arquivo:** `vercel.json`

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "buildCommand": "bun run build",
  "installCommand": "bun install",
  "regions": ["gru1"],
  "env": {
    "NEXT_PUBLIC_APP_NAME": "Casa dos Painéis"
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-store, max-age=0"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-DNS-Prefetch-Control",
          "value": "on"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/admin/:path*",
      "destination": "/admin/:path*"
    }
  ]
}
```

#### 5.3 Otimizar package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "db:push": "prisma db push",
    "db:generate": "prisma generate",
    "db:studio": "prisma studio",
    "db:migrate": "prisma migrate deploy",
    "vercel-build": "prisma generate && prisma migrate deploy && next build",
    "postinstall": "prisma generate"
  }
}
```

#### 5.4 Adicionar .vercelignore
```
# Vercel Ignore File
.env.local
.env*.local
.context/
*.md
!README.md
.git/
node_modules/
.next/
```

---

### **FASE 6: Documentação e Arquivamento** ⏱️ Estimativa: 30min

#### 6.1 Criar Guia de Reativação White Label
**Arquivo:** `.context/archived/white-label-reativacao.md`

```markdown
# Guia de Reativação: Modo White Label

**Data de Desativação:** 2026-01-23
**Motivo:** Foco em plataforma dedicada Casa dos Painéis

## Como Reativar

### 1. Restaurar Schema Prisma
Descomentar modelo `tenant_settings` em `prisma/schema.prisma`:

```bash
# Restaurar do backup
cp .context/archived/schema-with-white-label.prisma prisma/schema.prisma

# Ou descomentar manualmente linhas 182-203
```

### 2. Criar Migration
```bash
bun run prisma migrate dev --name enable_white_label
bun run prisma generate
```

### 3. Implementar Funcionalidades

#### API Routes Necessários:
- `src/app/api/tenant-settings/route.ts` - GET/POST
- `src/app/api/tenant-settings/[id]/route.ts` - PUT/PATCH/DELETE

#### Admin UI:
- `src/app/admin/branding/page.tsx` - Página de configuração
- `src/components/admin/branding-form.tsx` - Formulário

#### Middleware Multi-tenant:
```typescript
// src/middleware.ts
import { detectTenant } from "@/lib/tenant";

export async function middleware(req: NextRequest) {
  const tenant = await detectTenant(req);
  // Aplicar configurações do tenant
}
```

### 4. Environment Variables
Adicionar:
```bash
ENABLE_WHITE_LABEL=true
DEFAULT_TENANT_ID=1
```

### 5. Remover Branding Hardcoded
- Substituir `src/config/branding.ts` por load dinâmico
- Atualizar `layout.tsx` para usar tenant context
- Modificar theme provider para aplicar cores do tenant

## Arquivos de Referência
- Schema original: `.context/archived/schema-with-white-label.prisma`
- Env vars: `.context/archived/.env.example.backup`

## Estimativa de Trabalho
- **Tempo:** 8-12 horas
- **Complexidade:** Média-Alta
- **Dependências:** Prisma, Next.js API Routes, Middleware
```

#### 6.2 Atualizar CLAUDE.md
Adicionar seção sobre white label desabilitado:

```markdown
## 🏷️ White Label (Desabilitado)

O modo white label foi desativado em 2026-01-23 para focar na plataforma dedicada Casa dos Painéis.

- **Status:** Modelo preservado no schema (comentado)
- **Implementação:** 0% - apenas schema database
- **Reativação:** Ver `.context/archived/white-label-reativacao.md`
- **Branding atual:** Configuração estática em `src/config/branding.ts`
```

#### 6.3 Criar Changelog
**Arquivo:** `CHANGELOG.md` (criar se não existir)

```markdown
# Changelog - Casa dos Painéis

## [1.0.0] - 2026-01-23

### Changed
- **White Label Desabilitado:** Modelo `tenant_settings` comentado no schema
- **Branding Consolidado:** Identidade visual Casa dos Painéis centralizada em `src/config/branding.ts`
- **Configuração Vercel:** Otimizações para deploy em produção

### Added
- Arquivo de configuração de branding (`src/config/branding.ts`)
- CSS variables para cores da marca
- Componente `Logo` reutilizável
- Documentação de reativação white label

### Archived
- Schema white label em `.context/archived/white-label-schema.prisma`
- Guia de reativação em `.context/archived/white-label-reativacao.md`

### Technical
- Next.js output: standalone
- Vercel region: gru1 (São Paulo)
- Headers de segurança configurados
```

---

### **FASE 7: Testes e Validação** ⏱️ Estimativa: 1h

#### 7.1 Checklist de Validação Local

```bash
# 1. Limpar cache
rm -rf .next node_modules/.cache

# 2. Reinstalar dependências
bun install

# 3. Gerar Prisma Client
bun run db:generate

# 4. Build local
bun run build

# 5. Iniciar produção local
bun run start

# 6. Type checking
bun run type-check

# 7. Linting
bun run lint
```

#### 7.2 Testes Funcionais
- ✅ Landing page carrega com branding Casa dos Painéis
- ✅ Metadata SEO correto (inspecionar `<head>`)
- ✅ Favicon aparece corretamente
- ✅ Autenticação Clerk funciona
- ✅ Dashboard aluno acessível
- ✅ Admin panel acessível
- ✅ Player de vídeo funciona
- ✅ Prisma Client acessa banco sem erros
- ✅ Nenhum console error no navegador

#### 7.3 Testes de Performance
```bash
# Lighthouse CLI (instalar se necessário)
npm install -g lighthouse

# Rodar audit
lighthouse http://localhost:3000 --view
```

**Targets:**
- Performance: ≥90
- Accessibility: ≥95
- Best Practices: ≥90
- SEO: ≥95

---

### **FASE 8: Deploy Vercel** ⏱️ Estimativa: 1h

#### 8.1 Preparação do Repositório
```bash
# Commit todas as mudanças
git add .
git commit -m "feat: disable white label, focus Casa dos Painéis branding

- Commented out tenant_settings model
- Created centralized branding config
- Added Vercel optimizations
- Updated SEO metadata
- Archived white label docs for future reactivation"

# Push para GitHub
git push origin feature/disable-white-label
```

#### 8.2 Configuração Vercel Dashboard

**1. Importar Projeto:**
- Acessar https://vercel.com
- "Add New Project"
- Importar do GitHub: `Casa dos Painéis`

**2. Build Settings:**
```
Framework Preset: Next.js
Build Command: bun run vercel-build
Output Directory: .next
Install Command: bun install
```

**3. Environment Variables:**
Adicionar todas as variáveis do `.env.example`:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `DATABASE_URL` (Neon production)
- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_APP_URL`

**4. Deploy:**
- Clicar "Deploy"
- Aguardar build completar

#### 8.3 Configuração Pós-Deploy

**Domain Setup (Opcional):**
```
Project Settings > Domains
Adicionar: cursos.casadospaineis.com.br
Configurar DNS:
  CNAME cursos → cname.vercel-dns.com
```

**Performance Monitoring:**
- Habilitar "Speed Insights"
- Habilitar "Web Analytics"

**Security:**
- Configurar "DDoS Protection" (planos Pro+)
- Review "Security" tab

---

### **FASE 9: Monitoramento Pós-Deploy** ⏱️ Estimativa: 30min

#### 9.1 Checklist Produção
- ✅ Site acessível via URL Vercel
- ✅ Custom domain funciona (se configurado)
- ✅ HTTPS ativo
- ✅ Clerk autenticação funciona
- ✅ Conexão com banco Neon estável
- ✅ Logs da Vercel sem erros
- ✅ Metadata correto (Open Graph preview)
- ✅ Performance satisfatória (Speed Insights)

#### 9.2 Configurar Monitoring
```bash
# Adicionar Sentry (opcional)
bun add @sentry/nextjs

# Configurar em next.config.ts
```

#### 9.3 Setup Analytics
**Google Analytics (opcional):**
```typescript
// src/app/layout.tsx
{process.env.NEXT_PUBLIC_GA_ID && (
  <Script
    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
    strategy="afterInteractive"
  />
)}
```

---

## 📊 Resumo de Alterações

### Arquivos Criados
1. `src/config/branding.ts` - Configuração centralizada de marca
2. `src/components/branding/logo.tsx` - Componente de logo
3. `vercel.json` - Configuração Vercel
4. `.vercelignore` - Arquivos ignorados no deploy
5. `.context/archived/white-label-schema.prisma` - Backup schema
6. `.context/archived/white-label-reativacao.md` - Guia reativação
7. `CHANGELOG.md` - Histórico de mudanças

### Arquivos Modificados
1. `prisma/schema.prisma` - Modelo tenant_settings comentado
2. `src/app/layout.tsx` - Metadata Casa dos Painéis
3. `tailwind.config.ts` - Cores da marca
4. `src/app/globals.css` - CSS variables
5. `next.config.ts` - Otimizações Vercel
6. `.env.example` - Environment variables atualizadas
7. `package.json` - Scripts otimizados
8. `CLAUDE.md` - Documentação atualizada

### Arquivos Arquivados
1. `schema-with-white-label.prisma` → `.context/archived/`
2. `.env.example.backup` → `.context/archived/`

---

## ✅ Critérios de Sucesso

### Must-Have (Obrigatório)
- [x] White label desabilitado sem perda de funcionalidades
- [x] Branding Casa dos Painéis em 100% da aplicação
- [x] Deploy Vercel funcional
- [x] Banco de dados Neon conectado
- [x] Autenticação Clerk operacional
- [x] Performance ≥85 no Lighthouse

### Nice-to-Have (Opcional)
- [ ] Custom domain configurado
- [ ] Analytics integrado
- [ ] Monitoring (Sentry/Vercel Analytics)
- [ ] Performance ≥90 no Lighthouse
- [ ] PWA configurado

---

## 🚨 Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Migration database falha | Baixa | Alto | Schema comentado não afeta DB existente |
| Clerk keys incorretas | Média | Alto | Testar em preview antes de produção |
| Performance degradada | Baixa | Médio | Build otimizado + Vercel Edge |
| Custom domain DNS propagação | Alta | Baixo | Aguardar 24-48h, usar URL Vercel temporariamente |
| White label difícil reativar | Baixa | Médio | Documentação detalhada + schema arquivado |

---

## 📅 Timeline Estimado

**Total: 5-6 horas** (para desenvolvedor familiarizado)

| Fase | Duração | Dependências |
|------|---------|--------------|
| 1. Backup | 30min | - |
| 2. Database | 20min | Fase 1 |
| 3. Branding | 1h | Fase 2 |
| 4. Env Vars | 30min | Fase 3 |
| 5. Otimizações | 45min | Fase 4 |
| 6. Documentação | 30min | Fases 2-5 |
| 7. Testes | 1h | Fase 6 |
| 8. Deploy | 1h | Fase 7 |
| 9. Monitoring | 30min | Fase 8 |

---

## 🔄 Próximos Passos Após Deploy

1. **Semana 1:**
   - Monitorar logs Vercel
   - Acompanhar métricas de performance
   - Coletar feedback de usuários iniciais

2. **Semana 2:**
   - Otimizações baseadas em métricas
   - Configurar backups automáticos
   - Setup CI/CD (GitHub Actions)

3. **Mês 1:**
   - Implementar analytics avançado
   - Setup de monitoramento de erros
   - Documentação de operações

---

## 📚 Recursos Adicionais

- [Next.js Deployment - Vercel](https://nextjs.org/docs/deployment)
- [Prisma Deploy Guide](https://www.prisma.io/docs/guides/deployment)
- [Clerk Production Checklist](https://clerk.com/docs/deployments/production)
- [Neon Database Best Practices](https://neon.tech/docs/guides/vercel)

---

**Plano criado por:** Claude Code Assistant
**Versão:** 1.0
**Última atualização:** 2026-01-23
