# Casa dos Painéis - Plataforma LMS

Uma plataforma completa de gestão de aprendizagem (LMS) construída com Next.js 15, TypeScript, Tailwind CSS, Clerk, Prisma e shadcn/ui.

## 🚀 Tecnologias

- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript 5
- **Estilização:** Tailwind CSS 4 + shadcn/ui
- **Autenticação:** Clerk
- **Banco de Dados:** SQLite com Prisma ORM
- **Ícones:** Lucide React
- **Estado:** React Hooks + Server Components

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── (public)
│   │   ├── login/          # Página de login
│   │   ├── register/       # Página de registro
│   │   ├── courses/        # Catálogo de cursos
│   │   │   ├── [id]/     # Detalhes do curso
│   │   ├── dashboard/     # Dashboard do aluno
│   │   ├── learn/        # Player de curso
│   │   │   └── [courseId]/
│   │   ├── about/         # Sobre nós
│   │   ├── faq/           # Perguntas frequentes
│   │   ├── setup/         # Configuração inicial
│   │   └── (admin)/       # Área administrativa
│   │       ├── courses/   # Gestão de cursos
│   │       │   ├── new/  # Criar/Editar curso
│   │       ├── students/  # Gestão de alunos
│   │       └── sales/     # Relatório de vendas
│   ├── api/               # API Routes
│   │   ├── admin/         # APIs administrativas
│   │   ├── courses/       # APIs de cursos
│   │   ├── progress/      # APIs de progresso
│   │   ├── purchases/     # APIs de compras
│   │   ├── categories/    # APIs de categorias
│   │   ├── users/         # APIs de usuários
│   │   └── seed/         # Seed do banco
│   ├── components/
│   │   ├── ui/           # Componentes shadcn/ui
│   │   ├── layout/       # Sidebar e layout
│   │   ├── admin/        # Componentes admin
│   │   ├── course/       # Componentes de curso
│   │   ├── student/      # Componentes do aluno
│   │   └── setup/        # Setup wizard
│   ├── lib/
│   │   ├── db.ts         # Cliente Prisma
│   │   └── utils.ts      # Utilitários
│   └── hooks/            # Custom hooks
├── prisma/
│   └── schema.prisma     # Schema do banco
```

## 🗄️ Banco de Dados

### Tabelas

- **User:** Usuários do sistema
- **Category:** Categorias de cursos
- **Course:** Cursos
- **Chapter:** Capítulos dos cursos
- **Lesson:** Aulas dos capítulos
- **Purchase:** Compras de cursos
- **UserProgress:** Progresso do usuário nas aulas

### Relações

```
User 1:N Purchase
User 1:N UserProgress
Course 1:N Purchase
Course 1:N Chapter
Chapter 1:N Lesson
Category 1:N Course
Lesson 1:N UserProgress
```

## 🔐 Autenticação

### Rotas Públicas
- `/` - Home
- `/courses` - Catálogo
- `/courses/[id]` - Detalhes
- `/login` - Login
- `/register` - Registro
- `/about` - Sobre
- `/faq` - FAQ
- `/setup` - Configuração

### Rotas Protegidas (Alunos)
- `/dashboard` - Dashboard
- `/learn/[courseId]` - Player de curso
- `/my-courses` - Meus cursos

### Rotas Protegidas (Admin)
- `/admin` - Dashboard admin
- `/admin/courses` - Gerenciar cursos
- `/admin/students` - Gestão de alunos
- `/admin/sales` - Relatório de vendas

## 📋 Funcionalidades Implementadas

### ✅ Área Pública
- [x] Landing page moderna
- [x] Catálogo de cursos com filtros
- [x] Busca de cursos
- [x] Filtros por categoria
- [x] Página de detalhes do curso
- [x] Preview de aulas grátis
- [x] Sistema de avaliações (preparado)
- [x] Sobre nós
- [x] FAQ
- [x] Footer completo

### ✅ Autenticação
- [x] Login com Clerk
- [x] Registro com Clerk
- [x] Proteção de rotas via Middleware
- [x] Sistema de roles (admin/aluno)
- [x] Botões de login/logout funcionais
- [x] User menu com avatar

### ✅ Área do Aluno
- [x] Dashboard com estatísticas
- [x] Lista de cursos comprados
- [x] Progresso individual por curso
- [x] Progresso geral
- [x] Player de vídeo integrado
- [x] Marcar aulas como concluídas
- [x] Navegação entre aulas
- [x] Accordion de capítulos/aulas
- [x] Barra de progresso por capítulo

### ✅ Sistema de Compras
- [x] API de compras
- [x] Verificação de acesso
- [x] Preview gratuito
- [x] Histórico de compras
- [x] Validação de duplicatas

### ✅ Área Administrativa
- [x] Dashboard com estatísticas
- [x] CRUD completo de cursos
- [x] Criar novo curso
- [x] Editar curso existente
- [x] Publicar/Despublicar curso
- [x] Excluir curso
- [x] Upload de imagem (base64)
- [x] Busca de cursos
- [x] Lista de alunos
- [x] Estatísticas de alunos
- [x] Relatório de vendas
- [x] Métricas de receita

### ✅ Sistema de Progresso
- [x] Marcar aula como concluída
- [x] Buscar progresso por curso
- [x] Calcular percentual de conclusão
- [x] Total de aulas concluídas
- [x] Sincronização em tempo real

### ✅ Setup Inicial
- [x] Setup wizard visual
- [x] Seed do banco de dados
- [x] Criação de usuário de teste
- [x] Criação de cursos de exemplo

## 🎨 Design System

### Cores
- **Primary:** Emerald-600 (#059669)
- **Primary Dark:** Emerald-800 (#065f46)
- **Background:** Gray-50 (#f9fafb)
- **Surface:** White (#ffffff)
- **Text:** Gray-900 (#111827)

### Componentes
- Todos os componentes usam shadcn/ui
- Tema claro adaptado para verde da marca
- Design responsivo (mobile-first)
- Acessibilidade (ARIA labels)

## 🚀 Como Iniciar

### Pré-requisitos
- Node.js 18+
- Bun ou npm
- Conta no Clerk (para autenticação)

### Instalação

```bash
# Instalar dependências
bun install

# Configurar variáveis de ambiente
cp .env.example .env

# Configurar Clerk
# Adicione as seguintes variáveis no .env:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret

# Iniciar banco de dados
bun run db:push

# Popular banco com dados de exemplo
# Acesse: http://localhost:3000/setup
```

### Executar em Desenvolvimento

```bash
# Executar servidor de desenvolvimento
bun run dev

# Acessar: http://localhost:3000
```

### Executar em Produção

```bash
# Build
bun run build

# Start
bun run start
```

## 📝 Como Usar

### Primeiro Acesso

1. Acesse `http://localhost:3000/setup`
2. Clique em "Iniciar Configuração"
3. Isso criará:
   - 3 categorias
   - 3 cursos de exemplo
   - Capítulos e aulas de exemplo
   - Usuário de teste (teste@casadospaneis.com)

### Criar um Curso

1. Faça login como admin
2. Vá para `/admin/courses`
3. Clique em "Novo Curso"
4. Preencha os dados:
   - Título
   - Descrição
   - Categoria
   - Preço
   - Imagem (opcional)
5. Clique em "Criar Curso"
6. Adicione capítulos e aulas

### Comprar um Curso

1. Crie uma conta em `/register`
2. Navegue até `/courses`
3. Escolha um curso
4. Veja os detalhes em `/courses/[id]`
5. Clique em "Comprar"
6. O curso aparecerá no `/dashboard`

### Assistir a Aulas

1. Vá para `/dashboard`
2. Clique em "Continuar" em um curso
3. Escolha uma aula na sidebar
4. Assista ao vídeo
5. Marque como concluída
6. O progresso atualiza automaticamente

## 🔧 Configuração Avançada

### Integrar Gateway de Pagamento

Para adicionar Stripe ou Pagar.me:

1. Instale o SDK:
```bash
bun add stripe
# ou
bun add pagarme/node
```

2. Crie as rotas em `/api/checkout`
3. Configure webhooks em `/api/webhooks`
4. Atualize a página de detalhes do curso

### Serviço de Upload

Para substituir o upload em base64:

1. Configurar Vercel Blob ou AWS S3
2. Atualizar `/api/upload`
3. Usar SDK do serviço para upload
4. Salvar a URL no banco

### Email Notifications

1. Configurar serviço SMTP (Resend, SendGrid)
2. Criar templates de email
3. Adicionar webhooks do Clerk
4. Enviar emails em eventos específicos

## 📊 API Endpoints

### Cursos
- `GET /api/courses` - Listar todos os cursos
- `GET /api/courses/[id]` - Detalhes de um curso
- `POST /api/admin/courses` - Criar curso
- `PATCH /api/admin/courses/[id]` - Atualizar curso
- `DELETE /api/admin/courses/[id]` - Deletar curso

### Categorias
- `GET /api/categories` - Listar categorias
- `POST /api/categories` - Criar categoria

### Compras
- `GET /api/purchases?userId=...` - Listar compras
- `POST /api/purchases` - Criar compra

### Progresso
- `GET /api/progress?userId=...&courseId=...` - Obter progresso
- `PUT /api/progress` - Atualizar progresso

### Admin
- `GET /api/admin/students` - Listar alunos
- `GET /api/admin/sales` - Relatório de vendas

## 🌍 Deploy

### Vercel (Recomendado)

1. Push para GitHub
2. Conecte o repositório no Vercel
3. Configure as variáveis de ambiente
4. Deploy automático

### Outros

- Railway, Render, Netlify também funcionam
- Certifique-se de configurar DATABASE_URL
- Configure as chaves do Clerk

## 📈 Próximos Passos

### Curto Prazo
- [ ] Sistema de pagamentos real (Stripe/Pagar.me)
- [ ] Upload de vídeos (Mux/Vimeo)
- [ ] Certificados PDF
- [ ] Notificações por email

### Médio Prazo
- [ ] Sistema de avaliações com reviews
- [ ] Comentários por aula
- [ ] Fórum de discussão
- [ ] Quiz por aula

### Longo Prazo
- [ ] Mobile app (React Native)
- [ ] Sistema de indicações
- [ ] Cupons de desconto
- [ ] Analytics avançado

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto é propriedade da Casa dos Painéis.

## 👥 Suporte

Para suporte, entre em contato através do site oficial.

---

Desenvolvido com ❤️ pela equipe da Casa dos Painéis
