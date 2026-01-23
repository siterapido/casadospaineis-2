# Segurança e Conformidade

Este documento detalha as medidas de segurança e diretrizes de conformidade do projeto Casa dos Painéis.

## Autenticação e Autorização

- **Clerk**: O projeto utiliza Clerk para gerenciamento de identidades, oferecendo autenticação segura via provedores sociais, email/senha e MFA. 
- **Middleware de Segurança**: O `src/middleware.ts` deve ser configurado para proteger rotas sensíveis (como `/dashboard`, `/learn`, `/admin`), garantindo que apenas usuários autenticados e com permissões adequadas acessem esses recursos.
- **Proteção de API**: Todas as rotas em `src/app/api` devem validar a sessão do usuário antes de processar qualquer pedido sensível.

## Segurança de Dados

- **Prisma e SQL Injection**: O uso do Prisma ORM protege a aplicação contra ataques de SQL Injection através do uso de consultas parametrizadas.
- **Validação de Inputs**: Utilizamos **Zod** para validar rigorosamente todos os dados recebidos via formulários e payloads de API, prevenindo dados malformados ou ataques de injeção.
- **Variáveis de Ambiente**: Segredos como chaves de API do Clerk, strings de conexão de banco de dados e segredos do NextAuth devem ser mantidos exclusivamente em arquivos `.env` (nunca commitados no Git) e gerenciados de forma segura na plataforma de deployment.

## Práticas Recomendadas

- **Política de Senhas**: Gerenciado pelo Clerk, seguindo as melhores práticas da indústria.
- **HTTPS**: Toda a comunicação entre o cliente e o servidor deve ser criptografada via HTTPS (gerenciado pelo Caddy ou provedor de hosting).
- **CORS**: Configurado adequadamente para permitir solicitações apenas de domínios confiáveis.

## Auditoria e Logs

- Recomendamos a implementação de logs de auditoria para ações críticas de administração e compras.
- Erros do servidor são capturados e podem ser integrados a ferramentas como Sentry para monitoramento proativo.

---
*Gerado a partir da análise da base de código. Revise e aprimore conforme necessário.*
