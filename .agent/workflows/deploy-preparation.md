---
description: Plano para preparar o projeto Casa dos Painéis para deploy no Vercel
---

# Plano de Preparação para Deploy - Casa dos Painéis

## Status Atual
- ✅ Arquivo `.env.local` criado com todas as chaves necessárias
- ✅ Schema Prisma atualizado para PostgreSQL
- ✅ Banco de dados Neon DB sincronizado
- ✅ Dependências instaladas
- ❌ Build falhando devido a erro de pre-rendering

## Pendências Identificadas

### 1. Erros de Build (CRÍTICO)
**Problema:** Páginas usando `useSearchParams()` sem Suspense boundary
**Arquivos afetados:**
- `/src/app/admin/courses/new/page.tsx`
- Possivelmente outras páginas admin

**Solução:**
- Envolver páginas que usam `useSearchParams()` em Suspense
- Ou converter para Server Components quando possível
- Adicionar `export const dynamic = 'force-dynamic'` nas páginas problemáticas

### 2. Configuração de Variáveis de Ambiente

**Arquivo `.env.local` (LOCAL - NÃO COMMITAR):**
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_d2FudGVkLWNyaWNrZXQtMC5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_5IcUQrbu3tPcWD4Mt3T1T4bIpmj069IndNVIhtK5sn
DATABASE_URL=postgresql://neondb_owner:npg_32RHwMVaTzZL@ep-mute-glade-act0ljnh-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require
```

**Variáveis para configurar no Vercel:**
1. `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
2. `CLERK_SECRET_KEY`
3. `DATABASE_URL`

### 3. Verificações de Segurança

**✅ Arquivo `.gitignore` já configurado:**
- `.env*` está ignorado
- `.clerk/` está ignorado

**⚠️ Ações necessárias:**
- Verificar se não há credenciais hardcoded no código
- Confirmar que `.env.local` não será commitado

### 4. Otimizações para Produção

**Verificar:**
- [ ] Remover console.logs desnecessários
- [ ] Verificar se há imports não utilizados
- [ ] Confirmar que todas as imagens estão otimizadas
- [ ] Verificar se há dependências não utilizadas no package.json

### 5. Testes Pré-Deploy

**Antes de fazer deploy:**
- [ ] Build local bem-sucedido
- [ ] Testar autenticação Clerk localmente
- [ ] Testar conexão com Neon DB
- [ ] Verificar todas as rotas principais
- [ ] Testar criação de curso (admin)
- [ ] Testar visualização de cursos (público)

### 6. Configuração do Vercel

**Passos para deploy:**
1. Conectar repositório GitHub ao Vercel
2. Configurar variáveis de ambiente no painel do Vercel
3. Configurar Build Command: `npm run build`
4. Configurar Output Directory: `.next`
5. Ativar "Automatically expose System Environment Variables"

**Variáveis de ambiente do Vercel:**
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_d2FudGVkLWNyaWNrZXQtMC5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_5IcUQrbu3tPcWD4Mt3T1T4bIpmj069IndNVIhtK5sn
DATABASE_URL=postgresql://neondb_owner:npg_32RHwMVaTzZL@ep-mute-glade-act0ljnh-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require
```

### 7. Configuração Pós-Deploy

**Após primeiro deploy:**
1. Atualizar URLs permitidas no Clerk Dashboard
   - Adicionar domínio do Vercel (ex: `https://casa-dos-paineis.vercel.app`)
   - Configurar redirect URLs
2. Testar autenticação no ambiente de produção
3. Popular banco de dados se necessário (via API `/api/seed`)
4. Configurar domínio customizado (se aplicável)

### 8. Monitoramento

**Configurar:**
- [ ] Vercel Analytics
- [ ] Error tracking (Sentry ou similar)
- [ ] Logs do Neon DB
- [ ] Clerk logs e analytics

## Ordem de Execução

### Fase 1: Correção de Erros (AGORA)
1. Corrigir erro de build em `/admin/courses/new/page.tsx`
2. Verificar outras páginas com `useSearchParams()`
3. Executar build local até sucesso

### Fase 2: Verificação de Segurança
1. Confirmar `.gitignore` correto
2. Fazer grep por credenciais hardcoded
3. Revisar código sensível

### Fase 3: Preparação do Repositório
1. Commit das alterações
2. Push para GitHub
3. Verificar que `.env.local` não foi commitado

### Fase 4: Deploy no Vercel
1. Conectar repositório
2. Configurar variáveis de ambiente
3. Fazer primeiro deploy
4. Testar aplicação

### Fase 5: Configuração Final
1. Atualizar Clerk URLs
2. Testar autenticação
3. Popular dados se necessário
4. Configurar domínio (opcional)

## Comandos Úteis

```bash
# Build local
npm run build

# Verificar variáveis de ambiente
cat .env.local

# Sincronizar banco de dados
npx prisma db push

# Gerar Prisma Client
npx prisma generate

# Popular banco de dados
curl -X POST http://localhost:3000/api/seed

# Verificar se .env.local está no git
git status --ignored

# Verificar credenciais no código
grep -r "pk_test_" src/
grep -r "sk_test_" src/
grep -r "npg_" src/
```

## Checklist Final

- [ ] Build local bem-sucedido
- [ ] `.env.local` não está no git
- [ ] Variáveis de ambiente documentadas
- [ ] Código commitado e pushed
- [ ] Vercel configurado
- [ ] Variáveis de ambiente no Vercel
- [ ] Deploy realizado
- [ ] Clerk URLs atualizadas
- [ ] Aplicação testada em produção
- [ ] Monitoramento configurado

## Notas Importantes

⚠️ **NUNCA commitar arquivos `.env*` no git!**

⚠️ **Sempre usar variáveis de ambiente para credenciais**

⚠️ **Testar localmente antes de fazer deploy**

✅ **Manter backup das variáveis de ambiente em local seguro**

✅ **Documentar todas as configurações necessárias**
