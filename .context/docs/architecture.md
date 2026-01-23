# Arquitetura do Sistema

## Visão Geral

A arquitetura da **Casa dos Painéis** segue o padrão moderno do Next.js App Router, enfatizando Server Components por padrão e usando Client Components apenas quando necessário (interatividade). A aplicação é monolítica mas estruturada de forma a separar claramente interesses entre UI, lógica de negócio e acesso a dados.

## Camadas do Sistema

### 1. Camada de Apresentação (UI)
Localizada em `src/components`, esta camada é subdividida em:
- **ui/**: Componentes de base do shadcn/ui (botões, inputs, cards, etc.).
- **course/**: Componentes específicos do domínio de cursos (player, cards de curso).
- **layout/**: Componentes de estrutura (sidebar, footer, navegação).
- **student/**: Componentes específicos para o dashboard e experiência do aluno.

### 2. Camada de Rotas e Páginas
Localizada em `src/app`, utiliza o App Router do Next.js:
- **Rotas de API (`/api`)**: Endpoints para CRUD de cursos, categorias, progresso e compras.
- **Páginas Públicas**: Landing page (`/`), Sobre (`/about`), FAQ (`/faq`).
- **Páginas Protegidas**: Dashboard (`/dashboard`), Área de Estudo (`/learn`), Administração (`/admin`).

### 3. Camada de Dados (Persistência)
Localizada em `prisma/` e `src/lib/db.ts`:
- **Prisma ORM**: Utilizado para definir o esquema e realizar operações type-safe no banco de dados.
- **Modelos Principais**: `User`, `Course`, `Category`, `Chapter`, `Lesson`, `Purchase`, `UserProgress`.

### 4. Integrações Externas
- **Autenticação**: Clerk (em processo de integração/configuração) para gerenciamento de identidades.
- **Armazenamento de Vídeo**: Suporte para vídeos integrados (atualmente usando links/embeds).

## Fluxo de Dados

1. **Leitura**: A maioria das páginas (Server Components) busca dados diretamente via Prisma.
2. **Escrita**: Client Components interagem com as Rotas de API (`/api/*`) via `fetch` ou TanStack Query.
3. **Sincronização**: O progresso do aluno é atualizado em tempo real e persistido no banco de dados, refletindo instantaneamente na UI do player e dashboard.

## Decisões de Design e Padrões

- **Tailwind CSS 4**: Utilizado para estilização rápida e consistente com variáveis CSS modernas.
- **Zod**: Validação de esquemas tanto no frontend (formulários) quanto no backend (API payloads).
- **Zustand**: Gerenciamento de estado leve para estados globais da aplicação que não precisam de persistência complexa ou cache de servidor.
- **Progressive Enhancement**: O sistema de "Setup Wizard" permite inicializar a plataforma rapidamente com dados de exemplo, facilitando o desenvolvimento e testes.

## Infraestrutura

- **Bundle**: Bun é o gerenciador de pacotes e runtime preferencial.
- **Build**: Next.js Standalone build para fácil deploy em containers ou Vercel.

---
*Gerado a partir da análise da base de código. Revise e aprimore conforme necessário.*
