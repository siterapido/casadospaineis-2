# Casa dos Painéis - Project Context

> Auto-generated from .context/docs on 2026-01-23T17:51:49.000Z

---

## 🎯 Visão Geral do Projeto

A **Casa dos Painéis** é uma plataforma de Learning Management System (LMS) completa, desenvolvida com tecnologias modernas como Next.js 15, Prisma ORM e Tailwind CSS. O projeto visa fornecer um ambiente educacional robusto onde alunos podem acessar cursos, acompanhar seu progresso e assistir a aulas em um player de vídeo integrado.

### 📦 Stack Tecnológica

| Tecnologia | Versão/Descrição |
|------------|------------------|
| **Framework** | Next.js 15 (App Router) |
| **Linguagem** | TypeScript 5 |
| **Estilização** | Tailwind CSS 4 + shadcn/ui |
| **ORM** | Prisma |
| **Banco de Dados** | SQLite (dev) / PostgreSQL (prod) |
| **Autenticação** | Clerk |
| **Estado Global** | Zustand |
| **Data Fetching** | TanStack Query |
| **Visualização** | Recharts + TanStack Table |

---

## 🏗️ Arquitetura do Sistema

A arquitetura segue o padrão moderno do Next.js App Router, enfatizando Server Components por padrão e usando Client Components apenas quando necessário.

### Camadas do Sistema

```
src/
├── app/              # Rotas e páginas (App Router)
│   ├── api/          # Endpoints REST
│   ├── admin/        # Painel administrativo
│   ├── dashboard/    # Painel do aluno
│   └── learn/        # Área de estudos
├── components/       # Componentes React
│   ├── ui/           # shadcn/ui base components
│   ├── course/       # Componentes de cursos
│   ├── layout/       # Sidebar, footer, nav
│   └── admin/        # Componentes de admin
├── lib/              # Utilitários e configurações
│   ├── db.ts         # Cliente Prisma
│   └── utils.ts      # Funções auxiliares
└── middleware.ts     # Proteção de rotas (Clerk)

prisma/
└── schema.prisma     # Definição do banco de dados

.context/
├── docs/             # Documentação técnica
├── agents/           # Playbooks para agentes IA
└── workflow/         # Configuração de workflows
```

### Modelos Prisma Principais

- `User` - Usuários (alunos e admins)
- `Course` - Cursos disponíveis
- `Category` - Classificação de cursos
- `Chapter` - Módulos dentro de um curso
- `Lesson` - Aulas individuais
- `Purchase` - Compras de cursos
- `UserProgress` - Progresso dos alunos

---

## 💻 Fluxo de Desenvolvimento

### Preparação do Ambiente

```bash
# Requisitos: Bun ou Node.js 20+

# Instalar dependências
bun install

# Configurar variáveis de ambiente
cp .env.example .env

# Sincronizar banco de dados
bun run db:push
bun run db:generate
```

### Comandos Principais

| Comando | Descrição |
|---------|-----------|
| `bun run dev` | Inicia servidor de desenvolvimento |
| `bun run build` | Build de produção (standalone) |
| `bun run lint` | Verifica erros de linting |
| `bun run db:push` | Sincroniza schema com banco |
| `bun run db:studio` | Abre Prisma Studio |

### Padrões de Código

1. **Server Components por padrão** - Use `'use client'` apenas quando necessário
2. **Componentização** - Componentes pequenos e focados
3. **Nomenclatura** - PascalCase para componentes, camelCase para funções
4. **Validação** - Sempre use Zod para payloads de API
5. **Estilização** - Tailwind CSS com design system shadcn/ui

---

## 🛡️ Segurança e Conformidade

### Autenticação (Clerk)
- Autenticação via provedores sociais, email/senha e MFA
- Middleware em `src/middleware.ts` protege rotas sensíveis
- Rotas protegidas: `/dashboard`, `/learn`, `/admin`

### Proteção de Dados
- **Prisma ORM** - Proteção contra SQL Injection
- **Zod** - Validação rigorosa de inputs
- **Variáveis de Ambiente** - Secrets em `.env` (nunca commitados)

### Comunicação
- HTTPS obrigatório em produção (Caddy ou Vercel)
- CORS configurado para domínios confiáveis

---

## 📘 Glossário do Domínio

| Termo | Definição |
|-------|-----------|
| **Course** | Unidade principal de ensino |
| **Chapter** | Módulo/agrupamento de aulas |
| **Lesson** | Unidade mínima de conteúdo (vídeo + marcação) |
| **Purchase** | Registro de aquisição de curso |
| **User Progress** | Rastreamento de aulas concluídas |
| **Category** | Classificação por tema |
| **RSC** | React Server Component |
| **LMS** | Learning Management System |

---

## 📁 Estrutura de Arquivos Chave

```
├── src/app/page.tsx              # Landing page
├── src/app/dashboard/page.tsx    # Dashboard do aluno
├── src/app/admin/page.tsx        # Painel administrativo
├── src/app/learn/[courseId]/     # Player de curso
├── src/app/api/courses/          # API de cursos
├── src/app/api/progress/         # API de progresso
├── src/lib/db.ts                 # Cliente Prisma
├── src/middleware.ts             # Proteção de rotas
├── prisma/schema.prisma          # Schema do banco
└── .context/                     # Contexto para IAs
```

---

## 🏷️ White Label (Desabilitado)

O modo white label foi **desativado em 2026-01-23** para focar na plataforma dedicada Casa dos Painéis.

### Status Atual
- **Modelo Prisma:** `tenant_settings` preservado no schema (comentado)
- **Implementação:** 0% - apenas estrutura de banco de dados
- **Branding Atual:** Configuração estática em `src/config/branding.ts`
- **Reversibilidade:** ⭐⭐⭐⭐☆ (Fácil - 8-12h)

### Identidade Casa dos Painéis
| Elemento | Valor |
|----------|-------|
| **Nome** | Casa dos Painéis |
| **Tagline** | Transforme sua carreira com energia solar |
| **Cor Primária** | #F59E0B (Amarelo Solar) |
| **Cor Secundária** | #1E40AF (Azul Céu) |
| **Cor Accent** | #10B981 (Verde Sustentável) |

### Documentação
- **Reativação:** Ver `.context/archived/white-label-reativacao.md`
- **Plano Completo:** Ver `.context/plans/desativar-white-label.md`
- **Backup Schema:** Ver `.context/archived/schema-with-white-label.prisma`

---

## 🤖 Agentes IA Disponíveis

O projeto inclui playbooks em `.context/agents/` para guiar IAs em tarefas específicas:

- **code-reviewer** - Revisão de código e qualidade
- **feature-developer** - Desenvolvimento de funcionalidades
- **frontend-specialist** - Especialista em UI/UX
- **backend-specialist** - Especialista em APIs e dados
- **security-auditor** - Auditoria de segurança
- **performance-optimizer** - Otimização de performance
- **test-writer** - Escrita de testes
- **documentation-writer** - Documentação técnica

---

## 🔗 Links Úteis

- [Documentação Completa](.context/docs/README.md)
- [Arquitetura](.context/docs/architecture.md)
- [Workflow de Desenvolvimento](.context/docs/development-workflow.md)
- [Segurança](.context/docs/security.md)
- [Glossário](.context/docs/glossary.md)

---

*Sincronizado automaticamente do `.context/` em 2026-01-23T17:51:49-03:00*
