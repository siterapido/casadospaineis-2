# Casa dos Painéis - Plataforma LMS

Uma plataforma completa de Learning Management System (LMS) desenvolvida com Next.js 15, Prisma ORM e Tailwind CSS.

## 🚀 Características

### Funcionalidades Implementadas

1. **Landing Page Pública**
   - Lista de cursos em destaque
   - Estatísticas da plataforma
   - Seção de recursos
   - Call-to-action

2. **Sidebar Verde Vibrante**
   - Design em gradiente (emerald-800 → emerald-900)
   - Menu responsivo com hambúrguer para mobile
   - Navegação entre Início, Cursos e Dashboard
   - Seção de usuário com opção de logout

3. **Cards de Cursos**
   - Design moderno com Shadcn/UI
   - Exibição de preço, categoria e estatísticas
   - Indicador de progresso para cursos comprados
   - Botão de ação (Comprar/Continuar)

4. **API Routes**
   - `/api/courses` - Listar e criar cursos
   - `/api/courses/[courseId]` - Detalhes de um curso
   - `/api/categories` - Categorias de cursos
   - `/api/purchases` - Compras de cursos
   - `/api/progress` - Progresso do usuário
   - `/api/seed` - Popular banco de dados com dados de exemplo
   - `/api/users/test` - Criar usuário de teste

5. **Dashboard do Aluno**
   - Estatísticas (cursos comprados, progresso, aulas concluídas)
   - Lista de cursos com progresso individual
   - Cards com indicadores visuais

6. **Player de Curso**
   - Player de vídeo integrado
   - Sidebar com lista de capítulos e aulas
   - Indicador de progresso por capítulo
   - Funcionalidade de marcar aula como concluída
   - Design responsivo

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/
│   │   ├── courses/
│   │   │   ├── route.ts
│   │   │   └── [courseId]/
│   │   ├── categories/
│   │   ├── purchases/
│   │   ├── progress/
│   │   ├── seed/
│   │   └── users/
│   │       └── test/
│   ├── layout.tsx
│   ├── page.tsx
│   └── setup/
│       └── page.tsx
├── components/
│   ├── course/
│   │   ├── course-card.tsx
│   │   └── course-player.tsx
│   ├── layout/
│   │   └── sidebar.tsx
│   ├── setup/
│   │   └── setup-wizard.tsx
│   ├── student/
│   │   └── student-dashboard.tsx
│   └── ui/
├── lib/
│   ├── db.ts
│   └── utils.ts
└── hooks/
    └── use-mobile.ts
```

## 🗄️ Schema do Banco de Dados

### Tabelas Principais

- **User** - Usuários do sistema
- **Category** - Categorias de cursos
- **Course** - Cursos
- **Chapter** - Capítulos/Módulos dos cursos
- **Lesson** - Aulas dentro dos capítulos
- **Purchase** - Compras de cursos
- **UserProgress** - Progresso do usuário nas aulas

## 🎨 Design System

- **Cores Primárias**: Emerald-800 → Emerald-900 (sidebar)
- **Cor de Fundo**: Cinza claro (gray-50)
- **Componentes**: Shadcn/UI
- **Ícones**: Lucide React
- **Responsividade**: Mobile-first

## 🚀 Como Usar

### 1. Configurar o Banco de Dados

Acesse `/setup` no navegador para configurar o banco de dados com dados de exemplo:

1. Clique em "Iniciar Configuração"
2. Aguarde a conclusão do processo
3. Clique em "Ir para a Plataforma"

O processo irá criar:
- 3 categorias de cursos
- 3 cursos completos
- 3 capítulos
- 7 aulas com vídeos de exemplo
- 1 usuário de teste
- 1 compra de exemplo

### 2. Explorar a Plataforma

#### Landing Page (`/`)
- Visualize os cursos em destaque
- Conheça as estatísticas da plataforma
- Explore os recursos oferecidos

#### Setup Wizard (`/setup`)
- Configure o banco de dados
- Crie dados de exemplo
- Inicialize o sistema

#### API Endpoints

**Listar Cursos:**
```bash
GET /api/courses
```

**Detalhes do Curso:**
```bash
GET /api/courses/[courseId]
```

**Criar Compra:**
```bash
POST /api/purchases
{
  "userId": "test-user-1",
  "courseId": "course-1"
}
```

**Atualizar Progresso:**
```bash
PUT /api/progress
{
  "userId": "test-user-1",
  "lessonId": "lesson-1",
  "isCompleted": true
}
```

## 🧪 Usuário de Teste

- **Email**: teste@casadospaneis.com
- **ID**: test-user-1
- Já possui uma compra de exemplo do curso "Automação de Processos Empresariais"

## 📋 Próximos Passos

### Funcionalidades Pendentes

1. **Integração com Clerk**
   - Autenticação de usuários
   - Proteção de rotas
   - Gerenciamento de sessões

2. **Funcionalidades Avançadas**
   - Roteamento dinâmico para páginas de curso
   - Sistema de avaliações
   - Comentários em aulas
   - Sistema de certificados

3. **Melhorias de UI/UX**
   - Animações e transições
   - Modo escuro
   - Carregamento de estados
   - Tratamento de erros

4. **Administração**
   - Painel administrativo
   - Gestão de cursos
   - Relatórios e analytics

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript 5
- **Estilização**: Tailwind CSS 4
- **Componentes**: Shadcn/UI
- **ORM**: Prisma ORM
- **Banco de Dados**: SQLite
- **Ícones**: Lucide React
- **Autenticação**: NextAuth.js (disponível)

## 📝 Notas Importantes

- A sidebar usa cor verde vibrante (Emerald) conforme solicitado
- O layout é responsivo com menu hambúrguer para mobile
- O footer é fixo na parte inferior
- Todas as rotas API usam métodos HTTP adequados
- O sistema é completamente frontend-first para desenvolvimento rápido

## 🎯 Recursos da Plataforma

✅ Landing Page pública com cursos
✅ Sidebar verde vibrante responsiva
✅ Dashboard do aluno com progresso
✅ Player de curso com sidebar interna
✅ API routes completas
✅ Schema do Prisma robusto
✅ Sistema de progresso de aulas
✅ Cards de cursos com design profissional
✅ Setup wizard para inicialização
✅ Responsividade completa

---

Desenvolvido para a plataforma **Casa dos Painéis** 🏠📊
