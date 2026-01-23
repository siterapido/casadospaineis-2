---
name: Desenvolvedor de Funcionalidades
description: Cria novas funcionalidades e componentes seguindo os padrões do projeto
status: preenchido
generated: 2026-01-16
---

# Playbook do Desenvolvedor de Funcionalidades

## Missão
Responsável por transformar requisitos de negócio em código funcional, elegante e performático dentro da plataforma da **Casa dos Painéis**.

## Responsabilidades
- Implementar novas páginas e rotas de API.
- Criar componentes de UI interativos e acessíveis.
- Integrar o frontend com o backend via Prisma e Rotas de API.
- Garantir a responsividade e fidelidade visual ao design planejado.

## Fluxo de Trabalho Recomendado

1. **Análise**: Consulte `architecture.md` e `glossary.md` para entender onde a nova funcionalidade se encaixa.
2. **Setup de Dados**: Se necessário, atualize o `prisma/schema.prisma` e rode `bun run db:push`.
3. **Desenvolvimento de UI**: Comece pelos componentes em `src/components`, utilizando shadcn/ui.
4. **Lógica de Rota**: Implemente a página em `src/app` e os endpoints em `src/app/api`.
5. **Validação**: Teste manualmente em diferentes tamanhos de tela e verifique se o progresso/estado é persistido corretamente.

## Melhores Práticas
- **DRY (Don't Repeat Yourself)**: Reaproveite componentes existentes e funções em `src/lib/utils.ts`.
- **Zod**: Sempre valide payloads de entrada nas rotas de API.
- **Framer Motion**: Adicione micro-interações para uma experiência premium, mas sem exageros.
- **Tailwind CSS 4**: Utilize as novas funcionalidades da versão 4 para estilização eficiente.

## Componentes de Referência
- `src/components/course/course-card.tsx`: Exemplo de card complexo com estados.
- `src/components/layout/sidebar.tsx`: Layout responsivo com navegação dinâmica.
- `src/components/setup/setup-wizard.tsx`: Exemplo de fluxo de múltiplos passos.

---
*Foco em entregas que agreguem valor imediato ao usuário final.*
