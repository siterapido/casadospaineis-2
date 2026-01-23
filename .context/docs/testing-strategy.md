# Estratégia de Testes

Este documento descreve a abordagem de testes para garantir a qualidade e estabilidade da plataforma Casa dos Painéis.

## Níveis de Teste

### 1. Testes de Unidade (Unit Tests)
- **Foco**: Funções utilitárias (`src/lib/utils.ts`), lógica de componentes puros e hooks customizados.
- **Ferramenta Recomendada**: [Vitest](https://vitest.dev/) com React Testing Library.

### 2. Testes de Integração (Integration Tests)
- **Foco**: Fluxos de API e interação entre múltiplos componentes (ex: formulário de cadastro de curso interagindo com a API).
- **Abordagem**: Mockar requisições de rede e interações com o banco de dados via sub-módulos ou bancos temporários.

### 3. Testes de Ponta a Ponta (E2E Tests)
- **Foco**: Fluxos críticos do usuário:
  - Landing page → Login → Dashboard.
  - Acessar curso → Assistir aula → Marcar como concluída.
  - Painel Administrativo → Criar novo curso.
- **Ferramenta Recomendada**: [Playwright](https://playwright.dev/).

## Linhas de Base de Qualidade

- **Linting**: Executar `bun run lint` regularmente para manter a consistência do código.
- **TypeScript**: Nenhum código deve ser aceito com erros de tipagem (`any` deve ser evitado).
- **Acessibilidade (a11y)**: Utilizar os componentes do Radix UI (via shadcn) que já fornecem uma base sólida de acessibilidade.

## Fluxo de CI/CD

Recomenda-se integrar a execução de testes e lint no workflow do GitHub Actions (ou ferramenta similar) para cada Pull Request:
1. Instalação de dependências.
2. Verificação de tipos (tsc).
3. Execução de Linter.
4. Execução de testes de unidade e integração.
5. Deploy em ambiente de Preview para testes manuais.

---
*Gerado a partir da análise da base de código. Revise e aprimore conforme necessário.*
