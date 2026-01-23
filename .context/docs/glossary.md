# Glossário e Conceitos do Domínio

Este glossário define termos específicos do domínio e conceitos técnicos utilizados no projeto Casa dos Painéis.

## Termos de Negócio (LMS)

- **Course (Curso)**: Unidade principal de ensino, contendo capítulos e aulas.
- **Chapter (Capítulo/Módulo)**: Agrupamento lógico de aulas dentro de um curso.
- **Lesson (Aula)**: A unidade mínima de conteúdo, geralmente contendo um vídeo e podendo ser marcada como concluída.
- **Purchase (Compra)**: Registro de aquisição de um curso por um usuário, garantindo acesso ao conteúdo.
- **User Progress (Progresso)**: Rastreamento individual das aulas concluídas por um aluno em um curso específico.
- **Category (Categoria)**: Classificação taxonômica para organizar cursos por tema (ex: Inovação, Tecnologia, Negócios).

## Conceitos Técnicos

- **App Router**: Novo sistema de roteamento do Next.js 13+ baseado em pastas e arquivos especiais como `page.tsx` e `layout.tsx`.
- **Server Component (RSC)**: Componentes React que são renderizados no servidor, reduzindo o bundle de JavaScript enviado ao cliente.
- **Client Component**: Componentes que utilizam interatividade do React (hooks, events) e são hidratados no navegador.
- **Prisma ORM**: Ferramenta que mapeia o banco de dados para objetos TypeScript, facilitando consultas e mutações.
- **shadcn/ui**: Uma coleção de componentes reutilizáveis construída com Radix UI e Tailwind CSS, que não é instalada como dependência, mas "copiada" para o projeto para total controle.
- **Zod**: Biblioteca de declaração e validação de esquemas TypeScript, usada para validar dados de entrada em APIs e formulários.
- **Setup Wizard**: Um fluxo guiado (geralmente em `/setup`) para configurar o estado inicial do sistema e banco de dados.

## Abreviações

- **LMS**: Learning Management System (Sistema de Gestão de Aprendizagem).
- **MVP**: Minimum Viable Product (Produto Mínimo Viável).
- **SSR**: Server Side Rendering.
- **API**: Application Programming Interface.

---
*Gerado a partir da análise da base de código. Revise e aprimore conforme necessário.*
