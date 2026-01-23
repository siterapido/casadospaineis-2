# Fluxo de Desenvolvimento

Este documento descreve as práticas e processos recomendados para contribuir com o projeto Casa dos Painéis.

## Preparação do Ambiente

### Requisitos
- **Bun**: Recomendado como gerenciador de pacotes e runtime.
- **Node.js**: Versão 20 ou superior (caso não use Bun).
- **SQLite**: Banco de dados padrão para desenvolvimento local.

### Instalação
```bash
# Instalar dependências
bun install

# Configurar variáveis de ambiente (copie do .env.example se existir)
cp .env.example .env

# Sincronizar banco de dados e gerar cliente Prisma
bun run db:push
bun run db:generate
```

## Ciclo de Desenvolvimento

1. **Desenvolvimento Local**:
   ```bash
   bun run dev
   ```
   Acesse `http://localhost:3000`.

2. **Criação de Funcionalidades**:
   - Crie componentes em `src/components`.
   - Crie páginas/rotas em `src/app`.
   - Utilize Tailwind CSS para estilização seguindo o design system.

3. **Banco de Dados**:
   - Ao alterar o `schema.prisma`, execute `bun run db:push` para atualizar o banco local.
   - Utilize o `/setup` no navegador para repopular dados de teste se necessário.

4. **Linting e Tipagem**:
   - Verifique erros de lint: `bun run lint`.
   - Garanta que o TypeScript não aponte erros.

## Padrões de Código

- **Componentização**: Mantenha os componentes pequenos e focados. Use `src/components/ui` para componentes genéricos.
- **Server vs Client**: Use Server Components por padrão. Adicione `'use client'` apenas quando houver necessidade de hooks do React ou interatividade do navegador.
- **Nomenclatura**: Use PascalCase para componentes e camelCase para funções/variáveis. Pastas em `src/app` devem ser em lowercase (kebab-case para slugs).

## Deployment

O projeto está configurado para gerar um build standalone do Next.js:
```bash
bun run build
```
O output será gerado em `.next/standalone`, otimizado para produção.

## Ferramentas de Suporte (IA)

O projeto inclui Playbooks de Agentes em `.context/agents`. Utilize estes playbooks para guiar a IA em tarefas específicas como revisão, criação de testes e otimização.

---
*Gerado a partir da análise da base de código. Revise e aprimore conforme necessário.*
