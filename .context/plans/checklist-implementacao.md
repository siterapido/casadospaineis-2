# Checklist de Implementação: Desativação White Label

**Status:** 🔴 Não iniciado
**Última atualização:** 2026-01-23

---

## 🎯 Progresso Geral

```
[  ] FASE 1: Backup e Documentação (0/3)
[  ] FASE 2: Ajustes no Banco de Dados (0/3)
[  ] FASE 3: Consolidação de Branding (0/5)
[  ] FASE 4: Environment Variables (0/2)
[  ] FASE 5: Otimizações Vercel (0/4)
[  ] FASE 6: Documentação (0/3)
[  ] FASE 7: Testes e Validação (0/3)
[  ] FASE 8: Deploy Vercel (0/3)
[  ] FASE 9: Monitoramento (0/3)
```

**Progresso:** 0/29 tarefas (0%)

---

## 📋 FASE 1: Backup e Documentação

### 1.1 Criar Branch
```bash
git checkout -b feature/disable-white-label
```
- [ ] Branch criada
- [ ] Branch pushada para remoto

### 1.2 Backup de Arquivos
```bash
mkdir -p .context/archived
cp prisma/schema.prisma .context/archived/schema-with-white-label.prisma
cp .env.example .context/archived/.env.example.backup
```
- [ ] Diretório `.context/archived/` criado
- [ ] Backup `schema.prisma` criado
- [ ] Backup `.env.example` criado

---

## 📋 FASE 2: Ajustes no Banco de Dados

### 2.1 Comentar Modelo tenant_settings
**Arquivo:** `prisma/schema.prisma` (linhas 182-203)

- [ ] Modelo `tenant_settings` comentado com cabeçalho explicativo
- [ ] Comentário inclui data e referência ao guia

### 2.2 Gerar Prisma Client
```bash
bun run db:generate
```
- [ ] Cliente Prisma regenerado sem erros
- [ ] TypeScript types atualizados

### 2.3 Validar Conexão DB
```bash
bun run db:studio
```
- [ ] Prisma Studio abre sem erros
- [ ] Outras tabelas visíveis e funcionais

---

## 📋 FASE 3: Consolidação de Branding

### 3.1 Criar Configuração de Marca
**Arquivo:** `src/config/branding.ts`

- [ ] Arquivo criado com exportação BRANDING
- [ ] Todas as cores definidas
- [ ] SEO metadata completo
- [ ] Contato e redes sociais configurados
- [ ] TypeScript type `BrandingConfig` exportado

### 3.2 Atualizar Layout Principal
**Arquivo:** `src/app/layout.tsx`

- [ ] Importar `BRANDING` de `@/config/branding`
- [ ] Metadata usando `BRANDING.seo.*`
- [ ] OpenGraph configurado
- [ ] Twitter card configurado
- [ ] Favicon usando `BRANDING.logo.favicon`

### 3.3 Atualizar Tailwind Config
**Arquivo:** `tailwind.config.ts`

- [ ] Importar `BRANDING`
- [ ] Adicionar cores em `theme.extend.colors.brand`
- [ ] Testar build: `bun run build`

### 3.4 CSS Variables Globais
**Arquivo:** `src/app/globals.css`

- [ ] Adicionar `:root` com `--brand-*` variables
- [ ] Cores em formato HSL
- [ ] Validar syntax CSS

### 3.5 Componente Logo
**Arquivo:** `src/components/branding/logo.tsx`

- [ ] Criar diretório `src/components/branding/`
- [ ] Componente `Logo` criado
- [ ] Props `variant` e `className`
- [ ] Usar `next/image`
- [ ] Importar `BRANDING`

---

## 📋 FASE 4: Environment Variables

### 4.1 Atualizar .env.example
- [ ] Cabeçalho "Casa dos Painéis"
- [ ] Variáveis Clerk
- [ ] `DATABASE_URL`
- [ ] `NEXT_PUBLIC_APP_NAME`
- [ ] `NEXT_PUBLIC_APP_URL`
- [ ] Seção white label comentada

### 4.2 Preparar Variáveis Vercel
**Criar arquivo de referência:** `.env.vercel-production`

```bash
# NÃO COMMITAR ESTE ARQUIVO
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
CLERK_SECRET_KEY=sk_live_xxxxx
DATABASE_URL=postgresql://xxx@xxx.neon.tech/neondb
NEXT_PUBLIC_APP_NAME=Casa dos Painéis
NEXT_PUBLIC_APP_URL=https://casadospaineis.vercel.app
```

- [ ] Arquivo `.env.vercel-production` criado
- [ ] Adicionado ao `.gitignore`
- [ ] Valores de produção preenchidos

---

## 📋 FASE 5: Otimizações Vercel

### 5.1 Configurar next.config.ts
- [ ] `output: "standalone"`
- [ ] `images.formats` configurado
- [ ] `images.remotePatterns` para Clerk
- [ ] Headers de segurança adicionados
- [ ] Redirects configurados (se necessário)

### 5.2 Criar vercel.json
- [ ] Arquivo criado na raiz
- [ ] `framework: "nextjs"`
- [ ] `buildCommand: "bun run build"`
- [ ] `installCommand: "bun install"`
- [ ] `regions: ["gru1"]` (São Paulo)
- [ ] Headers configurados

### 5.3 Otimizar package.json
- [ ] Script `vercel-build` adicionado
- [ ] Script `postinstall` adicionado
- [ ] Script `db:migrate` adicionado

### 5.4 Criar .vercelignore
- [ ] Arquivo criado
- [ ] `.context/` ignorado
- [ ] `.env*.local` ignorado
- [ ] Arquivos desnecessários listados

---

## 📋 FASE 6: Documentação

### 6.1 Guia de Reativação
**Arquivo:** `.context/archived/white-label-reativacao.md`

- [ ] Arquivo criado
- [ ] Instruções de reativação completas
- [ ] Referências aos backups
- [ ] Estimativa de trabalho incluída

### 6.2 Atualizar CLAUDE.md
- [ ] Seção "White Label (Desabilitado)" adicionada
- [ ] Status e data de desativação
- [ ] Referência ao guia de reativação

### 6.3 Criar CHANGELOG.md
- [ ] Arquivo criado (se não existir)
- [ ] Versão 1.0.0 documentada
- [ ] Mudanças listadas
- [ ] Arquivos afetados documentados

---

## 📋 FASE 7: Testes e Validação

### 7.1 Build e Type Check Local
```bash
rm -rf .next node_modules/.cache
bun install
bun run db:generate
bun run type-check
bun run lint
bun run build
```

- [ ] Type check sem erros
- [ ] Lint sem erros
- [ ] Build completado com sucesso
- [ ] Nenhum warning crítico

### 7.2 Testes Funcionais
```bash
bun run start
# Abrir http://localhost:3000
```

- [ ] Landing page carrega
- [ ] Branding Casa dos Painéis visível
- [ ] Metadata correto (inspecionar `<head>`)
- [ ] Favicon aparece
- [ ] Login/Signup funciona (Clerk)
- [ ] Dashboard acessível
- [ ] Admin panel acessível
- [ ] Player de vídeo funciona
- [ ] Console sem erros

### 7.3 Performance Audit
```bash
# Lighthouse
lighthouse http://localhost:3000 --view
```

- [ ] Performance ≥85
- [ ] Accessibility ≥95
- [ ] Best Practices ≥90
- [ ] SEO ≥95

---

## 📋 FASE 8: Deploy Vercel

### 8.1 Commit e Push
```bash
git add .
git commit -m "feat: disable white label, focus Casa dos Painéis branding"
git push origin feature/disable-white-label
```

- [ ] Commit criado com mensagem descritiva
- [ ] Push para GitHub bem-sucedido
- [ ] Branch visível no remoto

### 8.2 Configurar Vercel
**Dashboard:** https://vercel.com

- [ ] Projeto importado do GitHub
- [ ] Framework: Next.js selecionado
- [ ] Build command: `bun run vercel-build`
- [ ] Install command: `bun install`
- [ ] Root directory: `./`

### 8.3 Environment Variables Vercel
**Project Settings > Environment Variables**

- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (Production)
- [ ] `CLERK_SECRET_KEY` (Production)
- [ ] `DATABASE_URL` (Production - Neon)
- [ ] `NEXT_PUBLIC_APP_NAME` (Production)
- [ ] `NEXT_PUBLIC_APP_URL` (Production)
- [ ] Variáveis de Preview configuradas (opcional)

### 8.4 Deploy
- [ ] Deploy iniciado
- [ ] Build completado sem erros
- [ ] Deployment successful
- [ ] URL de produção gerada

---

## 📋 FASE 9: Monitoramento Pós-Deploy

### 9.1 Validação em Produção
**URL:** `https://[seu-projeto].vercel.app`

- [ ] Site acessível
- [ ] HTTPS ativo
- [ ] Branding correto
- [ ] Clerk login funciona
- [ ] Database queries funcionam
- [ ] Logs sem erros críticos

### 9.2 Performance e Analytics
- [ ] Speed Insights habilitado (Vercel)
- [ ] Web Analytics habilitado (Vercel)
- [ ] Lighthouse audit em produção ≥85
- [ ] Core Web Vitals satisfatórios

### 9.3 Configurações Opcionais
- [ ] Custom domain configurado (se aplicável)
- [ ] DNS propagado (24-48h)
- [ ] Google Analytics adicionado (opcional)
- [ ] Sentry configurado (opcional)
- [ ] Error monitoring ativo

---

## 🎯 Checklist Final de Produção

### Pré-Launch
- [ ] Todos os testes passando
- [ ] Performance satisfatória
- [ ] Clerk produção configurado
- [ ] Database produção conectado
- [ ] Backups configurados

### Launch
- [ ] Deploy em produção realizado
- [ ] URL funcionando
- [ ] Monitoring ativo
- [ ] Team notificado

### Pós-Launch (Semana 1)
- [ ] Monitorar logs diariamente
- [ ] Verificar métricas de performance
- [ ] Coletar feedback de usuários
- [ ] Documentar issues encontrados

---

## 📊 Status do Projeto

**Última atualização:** _[Preencher ao iniciar]_

| Item | Status | Data | Notas |
|------|--------|------|-------|
| Backup criado | ⬜ Pendente | - | - |
| Schema atualizado | ⬜ Pendente | - | - |
| Branding consolidado | ⬜ Pendente | - | - |
| Env vars configuradas | ⬜ Pendente | - | - |
| Otimizações Vercel | ⬜ Pendente | - | - |
| Documentação | ⬜ Pendente | - | - |
| Testes locais | ⬜ Pendente | - | - |
| Deploy Vercel | ⬜ Pendente | - | - |
| Validação produção | ⬜ Pendente | - | - |

**Legenda:**
- ⬜ Pendente
- 🟡 Em andamento
- ✅ Completo
- ❌ Bloqueado

---

## 🚨 Bloqueadores e Issues

_[Documentar quaisquer problemas encontrados durante a implementação]_

| Issue | Prioridade | Status | Resolução |
|-------|------------|--------|-----------|
| - | - | - | - |

---

## 📝 Notas de Implementação

_[Adicionar notas durante a implementação]_

### Data: ____/____/____
-
-
-

---

**Checklist criado:** 2026-01-23
**Versão:** 1.0
**Responsável:** _[Preencher]_
