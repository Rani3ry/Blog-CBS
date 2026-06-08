# Blog Projeto Final

Blog em Next.js com painel administrativo, Prisma + MySQL e upload de imagens via Cloudinary.

## Rotas

- `/` - lista posts publicados
- `/blog/[slug]` - post publico
- `/admin/posts` - painel protegido por Basic Auth
- `/admin/posts/new` - criar post
- `/admin/posts/[id]/edit` - editar post

## Variaveis de ambiente

Configure localmente em `.env` e na Vercel em **Project Settings > Environment Variables**:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/defaultdb?ssl-mode=REQUIRED"
CLOUDINARY_URL="cloudinary://API_KEY:API_SECRET@CLOUD_NAME"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="troque-por-uma-senha-forte"
ADMIN_SESSION_TOKEN="troque-por-um-token-aleatorio-longo"
```

## Desenvolvimento

```bash
npm install
npm run dev
```

## Banco de dados

Gerar o Prisma Client:

```bash
npm run prisma:generate
```

Aplicar migrations em desenvolvimento:

```bash
npm run prisma:migrate
```

## Deploy na Vercel

1. Crie o repositorio no GitHub.
2. Suba o projeto sem o arquivo `.env`.
3. Importe o repositorio na Vercel.
4. Cadastre as variaveis de ambiente listadas acima.
5. Use o comando de build padrao do projeto:

```bash
npm run build
```

O build ja executa `prisma generate` antes do `next build`.
