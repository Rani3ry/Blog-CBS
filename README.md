# Blog Full Stack com Painel Administrativo 📝

Este projeto é um blog completo desenvolvido com **Next.js**, **Prisma**, **MySQL** e **Cloudinary**, permitindo a publicação, edição e gerenciamento de posts por meio de uma área administrativa protegida.

A aplicação conta com páginas públicas para leitura dos artigos e um painel admin para criar, editar, publicar, despublicar e excluir conteúdos. As imagens dos posts são enviadas para o Cloudinary, enquanto os dados do blog são armazenados em um banco MySQL.


## 🚀 Funcionalidades

### 🌐 Área Pública
* Página inicial com listagem dos posts publicados.
* Página individual para leitura completa de cada artigo.
* Exibição de imagem destacada, título, resumo, conteúdo e data de publicação.
* URLs amigáveis geradas automaticamente por slug.

### 🔐 Área Administrativa
* Painel protegido por autenticação básica.
* Criação de novos posts.
* Edição de posts existentes.
* Exclusão de posts.
* Controle de status entre rascunho e publicado.
* Upload de imagens para o Cloudinary.
* Salvamento da URL da imagem no banco de dados.

### 🗄️ Banco de Dados
* Modelagem com Prisma ORM.
* Migrations versionadas.
* Integração com MySQL.
* Campos preparados para título, slug, resumo, conteúdo, imagem, status e datas.


## 🛠️ Tecnologias Utilizadas

### 🎨 Frontend
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)

---

### ⚙️ Backend
![Next.js API Routes](https://img.shields.io/badge/Next.js_API-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

---

### 🗄️ Banco de Dados
![MySQL](https://img.shields.io/badge/MySQL-00758F?style=for-the-badge&logo=mysql&logoColor=white)

---

### ☁️ Upload e Mídia
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

---

### ☁️ Deploy
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

### 🔧 Ferramentas
![Git](https://img.shields.io/badge/Git-F05033?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)


## 🧪 Como Testar

1. Acesse a página do Blog pelo link: https://blog-cbs.vercel.app/
2. Entre no painel administrativo com as credenciais de demonstração
   admin: admin / senha: w48GmuGtHRIPzbV0OazykKUwLq5ZyJN.
3. Crie um novo post com título, resumo, conteúdo e imagem.
4. Marque o post como publicado.
5. Volte para a página inicial e confira o post publicado.
6. Abra a página individual do artigo para validar a leitura completa.


## 📦 Como rodar o projeto localmente

Caso deseje executar o projeto em sua máquina para desenvolvimento ou testes:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Rani3ry/Blog-CBS
   cd SEU_REPOSITORIO
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

   ```env
   DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/defaultdb?ssl-mode=REQUIRED"
   CLOUDINARY_URL="cloudinary://API_KEY:API_SECRET@CLOUD_NAME"
   ADMIN_USERNAME="admin"
   ADMIN_PASSWORD="sua-senha-forte"
   ADMIN_SESSION_TOKEN="seu-token-aleatorio-longo"
   ```

4. **Execute as migrations do Prisma:**

   ```bash
   npm run prisma:migrate
   ```

5. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

6. **Acesse no navegador:**

   ```txt
   http://localhost:3000
   ```


## 🔒 Segurança

* O arquivo `.env` está protegido pelo `.gitignore`.
* A área administrativa é protegida por autenticação básica.
* Uploads são feitos pelo servidor usando credenciais seguras.
* Headers de segurança foram configurados no Next.js.
* O Prisma Client é gerado automaticamente durante `dev` e `build`.


## 📌 Observações

Este projeto foi desenvolvido como aplicação full stack para prática e demonstração de integração entre frontend, backend, banco de dados, upload de imagens e deploy em produção.
