# Deploy (Frontend na Vercel + Backend na Railway)

## 1) Backend (Railway)

- Crie um novo projeto na Railway apontando para este repositório.
- Mantenha a raiz do serviço na raiz do repositório. O `railway.toml` usa o
  `Dockerfile` e configura o health check automaticamente.
- Adicione um serviço PostgreSQL ao mesmo projeto.
- No serviço do backend, crie referências para as variáveis do PostgreSQL:
  `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER` e `PGPASSWORD`.
- Configure `APP_PUBLIC_BASE_URL` com o domínio público do backend.
- Configure `APP_CORS_ORIGIN` com o domínio publicado do frontend.

## 2) Frontend (Vercel)

- Crie projeto na Vercel apontando para este repositório.
- Defina Root Directory como `frontend`.
- Configure variável:
  - `VITE_API_BASE_URL=https://SEU-BACKEND-URL.up.railway.app`

## 3) CORS e validação final

- No backend, ajuste `APP_CORS_ORIGIN` para o domínio da Vercel.
- Teste:
  - `GET /api/health` no backend publicado
  - Site em produção chamando API sem erro de CORS

## Observação importante

- O atalho de edição `F8` ficou restrito ao ambiente local.
- Para usar localmente, crie `frontend/.env.local` com:
  - `VITE_ENABLE_LOCAL_EDIT_SHORTCUT=true`
