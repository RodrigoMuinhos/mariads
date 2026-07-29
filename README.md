# Website para Tatuadora Isis Mariana

Projeto do site com:

- **Frontend** em React + Vite (`/frontend/src`)
- **Backend** em Spring Boot (`/backend`)
- **Banco** PostgreSQL (Neon)
- **Upload real de imagens** via API (`POST /api/images`)

---

## SEO e Google Search Console

O domínio canônico do projeto é `https://www.isismariana.com.br`. Durante o
build, `frontend/scripts/generate-seo.mjs` gera as entradas HTML das seções e o
`sitemap.xml` a partir da configuração central em
`frontend/scripts/seo-routes.mjs`.

Para verificar o site no Google Search Console:

1. Crie a variável `VITE_GOOGLE_SITE_VERIFICATION` na Vercel usando somente o
   código fornecido pelo Google, sem a tag HTML completa.
2. Faça um novo deploy e confirme que a meta tag
   `google-site-verification` aparece no HTML publicado.
3. Adicione e valide a propriedade de domínio no Search Console. Para validação
   por domínio, o Google também pode solicitar um registro TXT no DNS.
4. Envie `https://www.isismariana.com.br/sitemap.xml`.
5. Use a inspeção de URL para solicitar indexação da página inicial e das
   páginas públicas prioritárias.
6. Consulte periodicamente as páginas excluídas e os relatórios de indexação
   para identificar canonical divergente, bloqueio ou erro de rastreamento.

Não coloque tokens, senhas ou credenciais em variáveis com prefixo `VITE_`.
Esse prefixo torna o valor público no frontend.

---

## Como rodar o frontend

1. Entre na pasta `frontend`.
2. Instale as dependências: `npm i`
3. Inicie o servidor: `npm run dev`

Frontend padrão: `http://localhost:5173`

---

## Como rodar o backend (Spring Boot)

1. Entre na pasta `backend`.
2. Crie/edite `backend/.env` com os dados do banco.
3. Rode: `mvn spring-boot:run`

Backend padrão: `http://localhost:8080`

Health check:

- `GET http://localhost:8080/api/health`

---

## Variáveis de ambiente

### Frontend (`/frontend/.env`)

- `VITE_API_BASE_URL=http://localhost:8080`

### Backend (`/backend/.env`)

- `SPRING_DATASOURCE_URL=jdbc:postgresql://...`
- `SPRING_DATASOURCE_USERNAME=` (opcional se já estiver na URL)
- `SPRING_DATASOURCE_PASSWORD=` (opcional se já estiver na URL)
- `APP_PUBLIC_BASE_URL=http://localhost:8080`
- `APP_CORS_ORIGIN=http://localhost:5173`

> Observação: existe também um template em `backend/src/main/resources/.env`.

---

## Upload real de imagens

No modo edição (F8), ao clicar na imagem:

1. O frontend envia o arquivo para `POST /api/images` (multipart/form-data)
2. O backend salva o binário da imagem no PostgreSQL (`tattoo_images_binary`)
3. O backend retorna `imageUrl` no formato `/api/images/{id}/file`
4. O frontend atualiza o conteúdo com essa URL

Endpoint principal:

- `POST /api/images` (file, title, altText, category)

Também disponível:

- `GET /api/images`
- `GET /api/images/{id}/file`
- `DELETE /api/images/{id}`
