# Guia de Reativação: Modo White Label

**Data de Desativação:** 2026-01-23
**Motivo:** Foco em plataforma dedicada Casa dos Painéis
**Reversibilidade:** ⭐⭐⭐⭐☆ (Fácil)

---

## 📋 Visão Geral

Este guia fornece instruções completas para reativar a funcionalidade white label no Casa dos Painéis. O modelo `tenant_settings` foi preservado no schema (comentado) e pode ser facilmente restaurado.

**Tempo estimado:** 8-12 horas
**Complexidade:** Média-Alta
**Requisitos:** Conhecimento em Next.js, Prisma, TypeScript

---

## 🔄 Como Reativar

### PASSO 1: Restaurar Schema Prisma (5 min)

#### Opção A: Descomentar modelo no schema atual
**Arquivo:** `prisma/schema.prisma`

Localizar as linhas 182-209 e remover os comentários:

```prisma
// Remover estas linhas:
// =====================================================
// WHITE LABEL - DESABILITADO (2026-01-23)
// =====================================================
/*

// E estas:
*/

// Resultado: modelo tenant_settings ativo
```

#### Opção B: Restaurar do backup
```bash
# Copiar modelo do arquivo arquivado
cp .context/archived/schema-with-white-label.prisma prisma/schema.prisma
```

### PASSO 2: Criar Migration (10 min)

```bash
# Gerar migration para criar tabela
bun run prisma migrate dev --name enable_white_label

# Gerar Prisma Client
bun run prisma generate

# Verificar no Prisma Studio
bun run db:studio
```

---

### PASSO 3: Implementar API Routes (2-3h)

#### 3.1 Criar API de Tenant Settings

**Arquivo:** `src/app/api/tenant-settings/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { z } from "zod";

const TenantSettingsSchema = z.object({
  name: z.string().min(1).max(255),
  logo_url: z.string().url().optional(),
  logo_dark_url: z.string().url().optional(),
  logo_compact_url: z.string().url().optional(),
  favicon_url: z.string().url().optional(),
  primary_color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  secondary_color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  accent_color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  sidebar_color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  sidebar_text_color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  custom_scripts: z.string().optional(),
  landing_page_config: z.any().optional(),
  slug: z.string().max(50).optional(),
  domain: z.string().max(255).optional(),
});

// GET - Obter configurações do tenant
export async function GET(req: NextRequest) {
  try {
    const settings = await db.tenant_settings.findFirst({
      orderBy: { id: "asc" },
    });

    if (!settings) {
      return NextResponse.json(
        { error: "Tenant settings not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching tenant settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Atualizar configurações (apenas admin)
export async function PUT(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // TODO: Verificar se user é admin
    const user = await db.users.findUnique({ where: { clerk_id: userId } });
    if (user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const validated = TenantSettingsSchema.parse(body);

    const settings = await db.tenant_settings.upsert({
      where: { id: 1 },
      update: {
        ...validated,
        updated_at: new Date(),
      },
      create: {
        ...validated,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating tenant settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

---

### PASSO 4: Criar UI Admin (3-4h)

#### 4.1 Página de Branding no Admin

**Arquivo:** `src/app/admin/branding/page.tsx`

```typescript
import { BrandingForm } from "@/components/admin/branding-form";
import { db } from "@/lib/db";

export default async function BrandingPage() {
  const settings = await db.tenant_settings.findFirst({
    orderBy: { id: "asc" },
  });

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Configurações de Marca</h1>
        <p className="text-muted-foreground">
          Personalize a identidade visual da plataforma
        </p>
      </div>

      <BrandingForm initialData={settings} />
    </div>
  );
}
```

#### 4.2 Formulário de Branding

**Arquivo:** `src/components/admin/branding-form.tsx`

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  logo_url: z.string().url("URL inválida").optional().or(z.literal("")),
  primary_color: z.string().regex(/^#[0-9A-F]{6}$/i, "Cor inválida"),
  secondary_color: z.string().regex(/^#[0-9A-F]{6}$/i, "Cor inválida"),
  // ... outros campos
});

type FormData = z.infer<typeof schema>;

interface BrandingFormProps {
  initialData: any;
}

export function BrandingForm({ initialData }: BrandingFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialData?.name || "",
      logo_url: initialData?.logo_url || "",
      primary_color: initialData?.primary_color || "#2563eb",
      secondary_color: initialData?.secondary_color || "#1e40af",
    },
  });

  async function onSubmit(data: FormData) {
    try {
      setLoading(true);

      const response = await fetch("/api/tenant-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Erro ao salvar");

      toast({
        title: "Sucesso",
        description: "Configurações salvas!",
      });

      router.refresh();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao salvar configurações",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="name">Nome da Plataforma</Label>
        <Input id="name" {...form.register("name")} />
        {form.formState.errors.name && (
          <p className="text-sm text-destructive mt-1">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="primary_color">Cor Primária</Label>
          <div className="flex gap-2">
            <Input
              id="primary_color"
              type="color"
              {...form.register("primary_color")}
            />
            <Input {...form.register("primary_color")} placeholder="#2563eb" />
          </div>
        </div>

        <div>
          <Label htmlFor="secondary_color">Cor Secundária</Label>
          <div className="flex gap-2">
            <Input
              id="secondary_color"
              type="color"
              {...form.register("secondary_color")}
            />
            <Input
              {...form.register("secondary_color")}
              placeholder="#1e40af"
            />
          </div>
        </div>
      </div>

      {/* Adicionar mais campos conforme necessário */}

      <Button type="submit" disabled={loading}>
        {loading ? "Salvando..." : "Salvar Configurações"}
      </Button>
    </form>
  );
}
```

---

### PASSO 5: Middleware Multi-tenant (2-3h)

#### 5.1 Detectar Tenant

**Arquivo:** `src/lib/tenant.ts`

```typescript
import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function detectTenant(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const domain = host.split(":")[0]; // Remove porta

  // Tentar por domain customizado
  let tenant = await db.tenant_settings.findUnique({
    where: { domain },
  });

  if (!tenant) {
    // Tentar por slug no subdomínio
    const subdomain = domain.split(".")[0];
    tenant = await db.tenant_settings.findUnique({
      where: { slug: subdomain },
    });
  }

  if (!tenant) {
    // Fallback para tenant padrão
    tenant = await db.tenant_settings.findFirst({
      orderBy: { id: "asc" },
    });
  }

  return tenant;
}
```

#### 5.2 Atualizar Middleware

**Arquivo:** `src/middleware.ts`

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { detectTenant } from "@/lib/tenant";

const isPublicRoute = createRouteMatcher(["/", "/login(.*)", "/register(.*)"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Detectar tenant
  const tenant = await detectTenant(req);

  // Injetar tenant no request (via header customizado)
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-tenant-id", tenant?.id.toString() || "1");
  requestHeaders.set("x-tenant-name", tenant?.name || "Casa dos Painéis");

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Proteção de rotas
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  return response;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

---

### PASSO 6: Substituir Branding Estático por Dinâmico (1-2h)

#### 6.1 Context Provider para Tenant

**Arquivo:** `src/components/tenant-provider.tsx`

```typescript
"use client";

import { createContext, useContext, ReactNode } from "react";

type TenantSettings = {
  id: number;
  name: string;
  logo_url?: string | null;
  primary_color?: string | null;
  secondary_color?: string | null;
  // ... outros campos
};

const TenantContext = createContext<TenantSettings | null>(null);

export function TenantProvider({
  children,
  settings,
}: {
  children: ReactNode;
  settings: TenantSettings;
}) {
  return (
    <TenantContext.Provider value={settings}>{children}</TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error("useTenant must be used within TenantProvider");
  }
  return context;
}
```

#### 6.2 Atualizar Layout para Carregar Tenant

**Arquivo:** `src/app/layout.tsx`

```typescript
import { TenantProvider } from "@/components/tenant-provider";
import { db } from "@/lib/db";

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Carregar configurações do tenant
  const tenant = await db.tenant_settings.findFirst({
    orderBy: { id: "asc" },
  });

  const defaultTenant = {
    id: 1,
    name: "Casa dos Painéis",
    logo_url: "/logo.svg",
    primary_color: "#F59E0B",
    secondary_color: "#1E40AF",
  };

  return (
    <html lang="pt-BR">
      <head>
        <title>{tenant?.name || defaultTenant.name}</title>
        {/* Injetar CSS variables dinâmicas */}
        <style>{`
          :root {
            --brand-primary: ${tenant?.primary_color || defaultTenant.primary_color};
            --brand-secondary: ${tenant?.secondary_color || defaultTenant.secondary_color};
          }
        `}</style>
      </head>
      <body>
        <TenantProvider settings={tenant || defaultTenant}>
          {children}
        </TenantProvider>
      </body>
    </html>
  );
}
```

#### 6.3 Remover src/config/branding.ts

```bash
# Deletar ou renomear arquivo estático
mv src/config/branding.ts src/config/branding.ts.backup
```

---

### PASSO 7: Environment Variables (10 min)

#### Adicionar ao .env.example

```bash
# White Label
ENABLE_WHITE_LABEL=true
DEFAULT_TENANT_ID=1
```

#### Adicionar ao código

```typescript
// Verificar se white label está habilitado
const whitelabelEnabled = process.env.ENABLE_WHITE_LABEL === "true";
```

---

## 🧪 Testes de Reativação

### Checklist de Validação

- [ ] Modelo `tenant_settings` ativo no schema
- [ ] Migration executada com sucesso
- [ ] API `/api/tenant-settings` retorna dados
- [ ] Página `/admin/branding` acessível
- [ ] Formulário de branding funcional
- [ ] Middleware detecta tenant corretamente
- [ ] Cores dinâmicas aplicadas na UI
- [ ] Logo dinâmico sendo exibido
- [ ] Multi-tenant por domain funciona
- [ ] Multi-tenant por slug funciona

### Comandos de Teste

```bash
# 1. Verificar schema
bun run db:studio

# 2. Testar API
curl http://localhost:3000/api/tenant-settings

# 3. Build local
bun run build

# 4. Type check
bun run type-check
```

---

## 📦 Arquivos de Referência

- **Schema original:** `.context/archived/schema-with-white-label.prisma`
- **Env vars:** `.context/archived/.env.example.backup`
- **Documentação:** `.context/plans/desativar-white-label.md`

---

## ⚠️ Considerações Importantes

1. **Performance:** Carregar tenant em cada request pode impactar performance. Considere cache (Redis).

2. **Segurança:** Validar permissões de admin antes de permitir mudanças nas configurações.

3. **Migração de Dados:** Se houver dados antigos na tabela `tenant_settings`, execute backup antes.

4. **DNS:** Para multi-tenant com custom domains, configurar DNS apontando para Vercel.

5. **Theme Provider:** Integrar com `next-themes` para suportar dark mode + white label.

---

## 📊 Estimativa de Trabalho

| Passo | Tempo | Complexidade |
|-------|-------|--------------|
| 1. Restaurar Schema | 5 min | Baixa |
| 2. Migration | 10 min | Baixa |
| 3. API Routes | 2-3h | Média |
| 4. UI Admin | 3-4h | Média-Alta |
| 5. Middleware | 2-3h | Alta |
| 6. Dynamic Branding | 1-2h | Média |
| 7. Env Vars | 10 min | Baixa |
| **TOTAL** | **8-12h** | **Média-Alta** |

---

## 🆘 Troubleshooting

### Erro: "tenant_settings not found"
**Solução:** Executar seed ou criar primeiro tenant manualmente via Prisma Studio.

### Erro: "Cannot find module '@/lib/tenant'"
**Solução:** Criar arquivo `src/lib/tenant.ts` conforme Passo 5.1.

### CSS Variables não aplicam
**Solução:** Verificar se `<style>` tag está sendo injetada no `<head>` do layout.

### Multi-tenant por domain não funciona
**Solução:** Verificar configuração DNS e variável `host` no middleware.

---

**Última atualização:** 2026-01-23
**Autor:** Claude Code Assistant
**Versão:** 1.0
