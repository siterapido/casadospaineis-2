# Guia de Ferramentas e Produtividade

Este guia lista as ferramentas e automações disponíveis para melhorar a experiência de desenvolvimento na Casa dos Painéis.

## Ferramentas de Linha de Comando (CLI)

- **Bun**: Gerenciador de pacotes ultra-rápido usado para instalar dependências e rodar scripts.
- **Prisma CLI**: Usado para gerenciar o esquema do banco de dados e migrações.
  - `bunx prisma studio`: Interface visual para explorar o banco de dados.
  - `bunx prisma db push`: Sincroniza o schema com o banco sem migrações formais (ideal para dev inicial).

## Scripts Úteis (`package.json`)

- `bun run dev`: Inicia o servidor de desenvolvimento.
- `bun run build`: Cria a versão de produção otimizada.
- `bun run lint`: Verifica padrões de código e boas práticas.
- `bun run db:migrate`: Cria e aplica migrações do banco de dados.

## IA e Automação de Contexto

O projeto utiliza o **MCP ai-context** para manter a documentação e os agentes em sincronia com o código:
- `.context/docs/`: Contém a documentação técnica preenchida pela IA.
- `.context/agents/`: Contém playbooks para guiar agentes em diferentes funções (Reviewer, Developer, etc.).

## Extensões Recomendadas (VS Code)

- **Tailwind CSS IntelliSense**: Autocompletar classes CSS.
- **Prisma**: Suporte a sintaxe para arquivos `.prisma`.
- **ESLint**: Feedback de linting em tempo real.
- **Prettier**: Formatação automática de código.

## Configuração do Servidor Web (Caddy)

O projeto inclui um `Caddyfile` para facilitar a configuração de um servidor web reverso com HTTPS automático:
- Ideal para servir a aplicação em produção de forma simples e segura.

---
*Gerado a partir da análise da base de código. Revise e aprimore conforme necessário.*
