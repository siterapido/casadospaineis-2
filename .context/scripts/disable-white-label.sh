#!/bin/bash

###############################################################################
# Script de Automação: Desativação White Label
# Casa dos Painéis - Preparação para Produção Vercel
#
# Uso: bash .context/scripts/disable-white-label.sh [fase]
# Fases disponíveis: backup, validation, build, help
###############################################################################

set -e  # Exit on error

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função de log
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Banner
print_banner() {
    echo -e "${BLUE}"
    cat << "EOF"
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║        Casa dos Painéis - White Label Desativação        ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"
}

# Verificar requisitos
check_requirements() {
    log_info "Verificando requisitos..."

    # Verificar Bun
    if ! command -v bun &> /dev/null; then
        log_error "Bun não encontrado. Instale: https://bun.sh"
        exit 1
    fi
    log_success "Bun instalado: $(bun --version)"

    # Verificar Git
    if ! command -v git &> /dev/null; then
        log_error "Git não encontrado"
        exit 1
    fi
    log_success "Git instalado: $(git --version | head -n1)"

    # Verificar se está na raiz do projeto
    if [ ! -f "package.json" ]; then
        log_error "Execute este script da raiz do projeto"
        exit 1
    fi
    log_success "Diretório correto"

    echo ""
}

# FASE 1: Backup
run_backup() {
    log_info "FASE 1: Criando backups..."

    # Criar diretório de arquivos
    mkdir -p .context/archived
    log_success "Diretório .context/archived/ criado"

    # Backup schema.prisma
    if [ -f "prisma/schema.prisma" ]; then
        cp prisma/schema.prisma .context/archived/schema-with-white-label.prisma
        log_success "Backup: schema.prisma → schema-with-white-label.prisma"
    else
        log_warning "prisma/schema.prisma não encontrado"
    fi

    # Backup .env.example
    if [ -f ".env.example" ]; then
        cp .env.example .context/archived/.env.example.backup
        log_success "Backup: .env.example → .env.example.backup"
    else
        log_warning ".env.example não encontrado"
    fi

    # Criar branch
    BRANCH_NAME="feature/disable-white-label"
    CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

    if [ "$CURRENT_BRANCH" = "$BRANCH_NAME" ]; then
        log_warning "Já está na branch $BRANCH_NAME"
    else
        log_info "Criando branch $BRANCH_NAME..."
        git checkout -b $BRANCH_NAME 2>/dev/null || git checkout $BRANCH_NAME
        log_success "Branch $BRANCH_NAME criada/checkout"
    fi

    echo ""
    log_success "FASE 1: Backup concluído!"
    echo ""
}

# FASE 2: Validação
run_validation() {
    log_info "FASE 2: Validação do ambiente..."

    # Verificar dependências
    log_info "Verificando node_modules..."
    if [ ! -d "node_modules" ]; then
        log_warning "node_modules não encontrado. Instalando dependências..."
        bun install
    fi
    log_success "Dependências OK"

    # Verificar .env
    if [ ! -f ".env" ] && [ ! -f ".env.local" ]; then
        log_warning "Nenhum arquivo .env encontrado"
        log_info "Crie .env.local a partir de .env.example"
    else
        log_success "Arquivo .env encontrado"
    fi

    # Verificar Prisma
    log_info "Verificando Prisma Client..."
    if [ ! -d "node_modules/.prisma" ]; then
        log_warning "Prisma Client não gerado. Gerando..."
        bun run db:generate
    fi
    log_success "Prisma Client OK"

    # Type check
    log_info "Executando type check..."
    if bun run type-check; then
        log_success "Type check passou"
    else
        log_error "Type check falhou. Corrija os erros antes de continuar."
        exit 1
    fi

    echo ""
    log_success "FASE 2: Validação concluída!"
    echo ""
}

# FASE 3: Build
run_build() {
    log_info "FASE 3: Build e testes..."

    # Limpar cache
    log_info "Limpando cache..."
    rm -rf .next
    rm -rf node_modules/.cache
    log_success "Cache limpo"

    # Lint
    log_info "Executando lint..."
    if bun run lint; then
        log_success "Lint passou"
    else
        log_warning "Lint com avisos. Execute 'bun run lint:fix' para corrigir."
    fi

    # Build
    log_info "Executando build..."
    if bun run build; then
        log_success "Build completado com sucesso!"
    else
        log_error "Build falhou. Verifique os erros acima."
        exit 1
    fi

    # Build info
    if [ -d ".next" ]; then
        BUILD_SIZE=$(du -sh .next | cut -f1)
        log_info "Tamanho do build: $BUILD_SIZE"
    fi

    echo ""
    log_success "FASE 3: Build concluído!"
    echo ""
}

# Verificar status atual
check_status() {
    log_info "Status do projeto..."
    echo ""

    # Git status
    echo -e "${YELLOW}Git:${NC}"
    git status --short
    echo ""

    # Branch atual
    CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
    echo -e "${YELLOW}Branch atual:${NC} $CURRENT_BRANCH"
    echo ""

    # Arquivos modificados
    MODIFIED=$(git diff --name-only | wc -l)
    echo -e "${YELLOW}Arquivos modificados:${NC} $MODIFIED"
    echo ""

    # Checklist de arquivos necessários
    echo -e "${YELLOW}Checklist de arquivos:${NC}"

    FILES=(
        "src/config/branding.ts"
        "src/components/branding/logo.tsx"
        "vercel.json"
        ".vercelignore"
        ".context/archived/white-label-reativacao.md"
        "CHANGELOG.md"
    )

    for file in "${FILES[@]}"; do
        if [ -f "$file" ]; then
            echo -e "  ${GREEN}✓${NC} $file"
        else
            echo -e "  ${RED}✗${NC} $file ${YELLOW}(pendente)${NC}"
        fi
    done

    echo ""
}

# Executar todos os passos
run_all() {
    print_banner
    check_requirements
    run_backup
    run_validation
    run_build
    check_status

    echo ""
    log_success "Todas as fases automatizadas concluídas!"
    echo ""
    log_info "Próximos passos manuais:"
    echo "  1. Revisar mudanças no schema.prisma"
    echo "  2. Criar arquivos de branding (src/config/branding.ts)"
    echo "  3. Atualizar layout.tsx e components"
    echo "  4. Executar: bash $0 build"
    echo "  5. Consultar: .context/plans/checklist-implementacao.md"
    echo ""
}

# Help
show_help() {
    cat << EOF
${BLUE}Uso:${NC} bash .context/scripts/disable-white-label.sh [comando]

${YELLOW}Comandos disponíveis:${NC}
  backup      - Criar backups e branch (Fase 1)
  validation  - Validar ambiente e dependências (Fase 2)
  build       - Build e testes (Fase 3)
  status      - Verificar status atual do projeto
  all         - Executar todas as fases automatizadas
  help        - Mostrar esta mensagem

${YELLOW}Exemplos:${NC}
  bash .context/scripts/disable-white-label.sh backup
  bash .context/scripts/disable-white-label.sh all

${YELLOW}Documentação completa:${NC}
  .context/plans/desativar-white-label.md
  .context/plans/checklist-implementacao.md
  .context/plans/RESUMO-EXECUTIVO.md

EOF
}

# Main
main() {
    case "${1:-help}" in
        backup)
            print_banner
            check_requirements
            run_backup
            ;;
        validation)
            print_banner
            check_requirements
            run_validation
            ;;
        build)
            print_banner
            check_requirements
            run_build
            ;;
        status)
            print_banner
            check_status
            ;;
        all)
            run_all
            ;;
        help|--help|-h)
            print_banner
            show_help
            ;;
        *)
            log_error "Comando desconhecido: $1"
            show_help
            exit 1
            ;;
    esac
}

main "$@"
