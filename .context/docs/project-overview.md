# Visão Geral do Projeto

## Resumo

A **Casa dos Painéis** é uma plataforma de Learning Management System (LMS) completa, desenvolvida com tecnologias modernas como Next.js 15, Prisma ORM e Tailwind CSS. O projeto visa fornecer um ambiente educacional robusto onde alunos podem acessar cursos, acompanhar seu progresso e assistir a aulas em um player de vídeo integrado.

## Arquitetura e Tecnologias

O projeto utiliza uma stack moderna focada em performance e experiência do desenvolvedor:

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Linguagem**: TypeScript 5
- **Estilização**: Tailwind CSS 4 com design system baseado em shadcn/ui
- **ORM**: [Prisma](https://www.prisma.io/)
- **Banco de Dados**: Atualmente configurado com SQLite (pode ser migrado para PostgreSQL/Neon facilmente)
- **Autenticação**: Pronta para integração com [Clerk](https://clerk.com/) e suporte a NextAuth.js
- **Estado Global e Dados**: Zustand para gerenciamento de estado e TanStack Query para fetching de dados
- **Visualização de Dados**: Recharts e TanStack Table

## Funcionalidades Principais

- **Página de Destino (Landing Page)**: Apresentação da plataforma, cursos em destaque e estatísticas.
- **Painel do Aluno (Dashboard)**: Acompanhamento de cursos adquiridos, estatísticas de progresso e aulas concluídas.
- **Player de Curso**: Ambiente de estudos com reprodução de vídeo, lista de capítulos/aulas e marcação de progresso.
- **Administração**: Painel para gestão de cursos, categorias e usuários.
- **Setup Wizard**: Ferramenta integrada para inicialização do banco de dados e dados de exemplo.

## Público-Alvo

- Alunos interessados em cursos oferecidos pela Casa dos Painéis.
- Administradores e instrutores que gerenciam o conteúdo educacional.

## Estrutura da Equipe / Agentes

O projeto é otimizado para desenvolvimento assistido por IA, com playbooks específicos para:
- Revisão de código e qualidade.
- Desenvolvimento de novas funcionalidades.
- Especialistas em Frontend e Backend.
- Especialista em Segurança e Performance.

---
*Gerado a partir da análise da base de código. Revise e aprimore conforme necessário.*
