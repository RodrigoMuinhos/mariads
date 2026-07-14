# Deploy (Frontend na Vercel + Backend na Railway)

## 1) Backend (Railway)

- Crie um novo projeto na Railway apontando para este repositório.
- Selecione a pasta `backend` como root do serviço.
- Configure variáveis de ambiente usando `backend/.env.example` como base.
- Build command:
  - `mvn clean package -DskipTests`
- Start command:
  - `java -Dserver.port=$PORT -jar target/tattoo-backend-0.0.1-SNAPSHOT.jar`

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
