# Changelog - Casa dos Painéis

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2026-01-23

### Changed
- **White Label Desabilitado:** Modelo `tenant_settings` comentado no schema
- **Branding Consolidado:** Identidade visual Casa dos Painéis centralizada em `src/config/branding.ts`
- **Configuração Vercel:** Otimizações para deploy em produção
- **Metadata SEO:** Atualizada para foco em energia solar e painéis fotovoltaicos

### Added
- Arquivo de configuração de branding (`src/config/branding.ts`)
- CSS variables para cores da marca Casa dos Painéis
- Componente `Logo` reutilizável (`src/components/branding/logo.tsx`)
- Documentação completa de desativação white label (`.context/plans/`)
- Script de automação (`disable-white-label.sh`)
- Configuração Vercel (`vercel.json`)
- Arquivo `.vercelignore`
- Headers de segurança (X-Frame-Options, CSP, etc.)

### Archived
- Schema white label em `.context/archived/white-label-schema.prisma`
- Guia de reativação em `.context/archived/white-label-reativacao.md`

### Technical
- Next.js output: standalone
- Vercel region: gru1 (São Paulo)
- Paleta de cores: Amarelo solar (#F59E0B), Azul céu (#1E40AF), Verde (#10B981)
- Headers de segurança configurados
- Environment variables organizadas

### Documentation
- Plano completo de desativação (5-6h implementação)
- Checklist de 29 tarefas
- Resumo executivo
- Template de commit

---

## [Unreleased]

### Planejado
- [ ] Integração com Google Analytics
- [ ] PWA support
- [ ] Custom domain setup
- [ ] Performance optimization (target: Lighthouse ≥90)
- [ ] Monitoring com Sentry

---

**Legenda:**
- `Added` - Novas funcionalidades
- `Changed` - Mudanças em funcionalidades existentes
- `Deprecated` - Funcionalidades que serão removidas
- `Removed` - Funcionalidades removidas
- `Fixed` - Correções de bugs
- `Security` - Correções de segurança
- `Archived` - Funcionalidades preservadas para reativação
