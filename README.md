# 🚀 Bio AI — Gerador Inteligente de Bios

![Banner](https://github.com/seu-usuario/bio-ai/assets/banner.png)

O **Bio AI** é uma aplicação web moderna que transforma ideias em bios únicas e criativas.  
Desenvolvido com **React + TypeScript**, ele utiliza **TanStack Router**, **Tailwind CSS** e **ShadCN/UI** para oferecer uma experiência leve, rápida e elegante.

---

## 🧩 Tecnologias Utilizadas

### Backend (`apps/server`)
- [Fastify](https://fastify.dev/) — servidor HTTP performático
- [Prisma ORM](https://www.prisma.io/) — modelagem e acesso ao banco
- [Zod](https://zod.dev/) — validação de schemas
- [JWT](https://jwt.io/) — autenticação segura
- [OpenAI API](https://platform.openai.com/) — geração de bios via IA

### Frontend (`apps/web`)
- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TanStack Router](https://tanstack.com/router)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) — componentes acessíveis e modernos

---

## 🧠 Conceito do Projeto

O **Bio AI** tem como objetivo simplificar a criação de bios personalizadas e criativas para redes sociais, portfólios ou currículos.  
Com apenas alguns cliques, o usuário pode gerar textos originais que refletem seu estilo e personalidade.

> “Transforme suas ideias em bios que se destacam.”

---

## 🧰 Instalação e Execução

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/seu-usuario/bio-ai.git
cd bio-ai
```

### 2️⃣ Instale as dependências
```bash
npm install
```

### 3️⃣ Execute o projeto
```bash
npm run dev
```

O app estará disponível em:
```bash
http://localhost:3000
```

### 📦 Scripts Disponíveis

| Comando           | Função                               |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Inicia o servidor de desenvolvimento |
| `npm run build`   | Gera o build de produção             |
| `npm run preview` | Executa o build localmente           |
| `npm run lint`    | Analisa e corrige problemas de lint  |
| `npm run format`  | Formata o código (Prettier)          |

### 🧩 Rotas Principais

| Rota               | Descrição                                     |
| ------------------ | --------------------------------------------- |
| `/`                | Redireciona automaticamente para `/home`      |
| `/home`            | Página inicial com apresentação da ferramenta |
| `/login`           | Tela de autenticação                          |
| `/register`        | Cadastro de novos usuários                    |
| `/planos`          | Exibição dos planos disponíveis               |
| `/admin/dashboard` | Painel de controle (acesso restrito)          |

### 🧠 Geração de Bios (API)

Endpoint: POST /bio/save

Exemplo de Requisição:
```json
{
  "title": "User Example Bio",
  "style": "profissional",
  "links": [
    "https://linkedin.com/in/user-example",
    "https://github.com/user-example"
  ]
}
```

Resposta:
```json
{
  "content": "**User Example Bio**\n\n🌟 Profissional de Marketing Digital..."
}
```

### 🎨 Design e Layout

O design segue um padrão minimalista e moderno, inspirado em soluções SaaS.
O layout utiliza:

- Gradientes suaves com fundo escuro (modo dark padrão)

- Cards com bordas arredondadas e sombras sutis

- Tipografia clara e bem espaçada

- Ilustrações vetoriais no estilo 3D minimal flat

### 🔒 Autenticação

A autenticação é gerenciada por um contexto (AuthProvider), que controla:

Sessão e token do usuário

Proteção de rotas privadas (via TanStack Router)

Persistência no localStorage

### 🧱 Componentes Chave

Header — menu superior com logotipo e navegação

LoginForm — formulário de acesso estilizado

PlanosCard — visualização dos planos do serviço

Loader — componente global de carregamento

### 🧑‍💻 Desenvolvimento

O projeto foi desenvolvido com foco em:

Arquitetura modular e componentizada

Padrões de tipagem forte (TypeScript)

Rotas baseadas em arquivos (TanStack Router)

Integração fluida entre layouts e contexto global

### 🧾 Licença

Este projeto é distribuído sob a licença MIT.
Você é livre para usá-lo, modificá-lo e redistribuí-lo, desde que mantenha os créditos originais.

### ⭐ Se este projeto te ajudou, considere deixar uma estrela no repositório!

```bash
git add README.md
git commit -m "docs: add complete project README"
git push origin main
```
