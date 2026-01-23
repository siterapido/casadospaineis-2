# 🚀 Guia Rápido de Deploy - Casa dos Painéis

## Status: ✅ PRONTO PARA DEPLOY

### O que já foi feito:
- ✅ Variáveis de ambiente configuradas
- ✅ Banco de dados PostgreSQL (Neon) configurado
- ✅ Build de produção testado e funcionando
- ✅ Segurança verificada (sem credenciais no código)
- ✅ Erro de pre-rendering corrigido

---

## 📦 Deploy em 5 Passos

### 1️⃣ Inicializar Git
```bash
cd "/Users/marcosalexandre/Casa dos Painéis"
git init
git add .
git commit -m "Initial commit - Casa dos Painéis LMS"
```

### 2️⃣ Criar Repositório no GitHub
1. Acesse: https://github.com/new
2. Nome: `casa-dos-paineis`
3. **NÃO** marque "Initialize with README"
4. Clique em "Create repository"

### 3️⃣ Fazer Push
```bash
# Substitua SEU_USUARIO pelo seu usuário do GitHub
git remote add origin https://github.com/SEU_USUARIO/casa-dos-paineis.git
git branch -M main
git push -u origin main
```

### 4️⃣ Deploy no Vercel
1. Acesse: https://vercel.com
2. Clique em "Add New Project"
3. Importe o repositório `casa-dos-paineis`
4. **IMPORTANTE:** Adicione estas variáveis de ambiente:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_d2FudGVkLWNyaWNrZXQtMC5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_5IcUQrbu3tPcWD4Mt3T1T4bIpmj069IndNVIhtK5sn
DATABASE_URL=postgresql://neondb_owner:npg_32RHwMVaTzZL@ep-mute-glade-act0ljnh-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require
```

5. Clique em "Deploy"

### 5️⃣ Configurar Clerk
1. Acesse: https://dashboard.clerk.com
2. Vá em "Domains"
3. Adicione a URL do Vercel (ex: `https://casa-dos-paineis.vercel.app`)
4. Configure os paths:
   - Sign-in: `/login`
   - Sign-up: `/register`
   - After sign-in: `/dashboard`

---

## 🧪 Testar Aplicação

Após o deploy:
1. Acesse a URL do Vercel
2. Teste o login em `/login`
3. Acesse `/setup` para popular dados iniciais
4. Teste a área admin em `/admin`

---

## 📚 Documentação Completa

Para mais detalhes, consulte:
- `DEPLOY_READY.md` - Documentação completa
- `.agent/workflows/deploy-preparation.md` - Plano detalhado

---

## 🆘 Problemas?

### Build falhou no Vercel?
- Verifique se as variáveis de ambiente foram configuradas
- Confirme que a DATABASE_URL está correta

### Erro de autenticação?
- Verifique se adicionou a URL do Vercel no Clerk Dashboard
- Confirme que as chaves do Clerk estão corretas

### Banco de dados vazio?
- Acesse `/setup` na aplicação
- Ou execute: `curl -X POST https://sua-url.vercel.app/api/seed`

---

**Boa sorte com o deploy! 🎉**
