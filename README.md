# 🚀 AutoBio — Gerador Inteligente de Bios e Perfis

<div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
<img src="./apps/web/src/lib/assets/images/logo.svg" alt="Banner" style="width: 60px; height: 60px;" /> <span style="font-size: 24px; font-weight: 700; background: linear-gradient(to right, #0066ff, #8c00ff); -webkit-background-clip: text; background-clip: text; color: transparent; font-family: 'Poppins', sans-serif;">AutoBio</span>
</div>


O **AutoBio** é uma plataforma SaaS moderna que transforma ideias em biografias únicas e criativas, oferecendo páginas de perfil personalizáveis, bonitas e prontas para uso.
Desenvolvido com foco em experiência do usuário, ele utiliza Inteligência Artificial para gerar conteúdos dinâmicos, hospedagem de imagens em nuvem e templates altamente customizáveis.

---

## ✨ Principais Funcionalidades e Estatísticas

- **🪄 Geração por IA**: Textos gerados de forma inteligente e contextualizada.
- **🎨 Templates Exclusivos**: Múltiplos temas interativos (Profissional, Tecnológico, Criativo, Divertido e Neutro).
- **🖌️ Personalização Avançada**: Cores dinâmicas (`bio.theme`), upload de avatares com recorte automático e design responsivo.
- **🔗 Agregador de Links**: Adicione e gerencie todas as suas redes sociais em um só lugar.
- **💳 Assinaturas Premium**: Integração robusta via Stripe para planos pagos e recursos exclusivos.
- **🔐 Autenticação Segura**: Controle de acesso completo e rotas protegidas.

---

## 🧩 Tecnologias Utilizadas

### 🛠️ Arquitetura

- **[Turborepo](https://turbo.build/)** — Gerenciamento de Monorepo rápido e eficiente.
- **[Bun](https://bun.sh/)** — Runtime e gerenciador de pacotes ultra-rápido.

### 💻 Backend (`apps/server`)

- **[Fastify](https://fastify.dev/)** — Servidor HTTP de altíssima performance.
- **[Prisma ORM](https://www.prisma.io/)** — Modelagem e acesso ao banco de dados.
- **[Google Gemini API](https://ai.google.dev/)** — Motor de geração de texto por Inteligência Artificial.
- **[Cloudinary](https://cloudinary.com/)** — Upload via streaming, armazenamento e entrega rápida de imagens.
- **[Stripe](https://stripe.com/br)** — Processamento de pagamentos, assinaturas e webhooks.
- **[Zod](https://zod.dev/)** & **[JWT](https://jwt.io/)** — Validação rigorosa de dados e autenticação de usuários.

### 📱 Frontend (`apps/web`)

- **[React 18](https://react.dev/)** + **[Vite](https://vitejs.dev/)**
- **[TanStack Router](https://tanstack.com/router)** — Roteamento avançado, seguro (type-safe) e performático.
- **[TanStack Query](https://tanstack.com/query)** — Gerenciamento de estado assíncrono, hooks e cache.
- **[Tailwind CSS](https://tailwindcss.com/)** + **[Framer Motion](https://www.framer.com/motion/)** — Estilização moderna e animações fluidas baseadas em física.
- **[shadcn/ui](https://ui.shadcn.com/)** — Biblioteca de componentes acessíveis, customizáveis e com excelente UI/UX.
- **[React Hook Form](https://react-hook-form.com/)** — Formulários complexos otimizados com suporte a validações flexíveis.

---

## 🧠 Conceito do Projeto

O **AutoBio** tem como objetivo simplificar a criação de páginas de perfil unificadas (no formato _link-in-bio_) para profissionais, influenciadores, criadores de conteúdo e empresas.
Com apenas alguns cliques, o usuário pode:

1. Gerar um texto de apresentação original.
2. Escolher um layout impactante.
3. Ajustar sua paleta de cores.
4. Fazer upload de uma foto de perfil.
5. Compartilhar sua **URL pública** personalizada com o mundo.

> “Sua presença online, centralizada, bonita e potencializada por Inteligência Artificial.”

---

## 🧰 Instalação e Execução

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/LucasGabrielGit/auto-bio.git
cd auto-bio
```

### 2️⃣ Instale as dependências (via Bun)

```bash
bun install
```

### 3️⃣ Configure as Variáveis de Ambiente

Renomeie os arquivos de exemplo para `.env` nos respectivos pacotes (`apps/server`, `apps/web`) e preencha as variáveis de ambiente necessárias:

- `DATABASE_URL` (Conexão com o banco via Prisma)
- `GEMINI_API_KEY` (Chave de API do Google Gemini)
- `CLOUDINARY_URL` (URL de conexão ao Cloudinary)
- `STRIPE_SECRET_KEY` & `STRIPE_WEBHOOK_SECRET` (Credenciais Stripe)
- Segredos para a geração do Token JWT

### 4️⃣ Execute o projeto

```bash
bun dev
```

Isso iniciará o Turborepo em modo de desenvolvimento paralelo. O frontend geralmente roda na porta `5173` e a API na porta `3333`.

### 📦 Principais Scripts (`package.json` raiz)

| Comando         | Função                                        |
| --------------- | --------------------------------------------- |
| `bun dev`       | Inicia o ambiente de desenvolvimento completo |
| `bun run build` | Gera o build de produção dos apps             |
| `bun run lint`  | Analisa o código com ESLint                   |

---

## 🎨 Design e Layout

O design segue um padrão atual e minimalista inspirado nos principais produtos SaaS:

- Suporte nativo a **Modo Claro e Escuro (Dark/Light mode)**.
- **Efeitos de Glassmorphism** (fundos com desfoque) em modais e painéis de ação.
- Sistema de **Temas Personalizados**, injetando cores selecionadas pelo usuário diretamente nos templates (`bio.theme`).
- Micro-interações e **animações elásticas suaves**, como o surgimento de modais, menus dropdown e navegação entre abas via `framer-motion`.

---

## 🧾 Licença

Este projeto é distribuído sob a licença **MIT**. Você é livre para usá-lo, modificá-lo e redistribuí-lo, desde que mantenha os créditos originais.

⭐ **Se o AutoBio ajudou você a aprender ou acelerou seus projetos, considere deixar uma estrela no repositório!**
