﻿# 🎉 Personal Events Organizer API

Este projeto é uma API para gerenciamento de eventos pessoais, desenvolvida com Node.js, TypeScript, Fastify e Prisma. O foco é servir como base educacional para você praticar o desenvolvimento de rotas, integração com banco de dados e boas práticas em backend.

---

## 🚀 Visão Geral

Os usuários desta API podem:

- Registrar-se e autenticar-se
- Obter e atualizar seu perfil
- Criar eventos pessoais
- Listar eventos disponíveis
- Inscrever-se em eventos
- Filtrar eventos por critérios (datas, título, etc.)

> **Importante:** Nesta versão inicial, não existem níveis de permissão (admin/usuário). Todos os usuários autenticados podem realizar todas as operações listadas.

---

## 🛠 Tecnologias Utilizadas

- **Node.js** (v20.x)
- **TypeScript**
- **Fastify**
- **Prisma ORM**
- **PostgreSQL**
- **Docker & Docker Compose**

---

## 📁 Estrutura de Pastas

```
/src
├── @types              # Definições TypeScript customizadas
├── env                 # Carregamento e validações de variáveis de ambiente
├── http
│   ├── controllers     # Lógica de cada rota
│   ├── middleware      # Middlewares (autenticação, validações)
│   └── routes          # Definição das rotas da API
├── lib                 # Serviços e utilitários reaproveitáveis
├── repositories
│   ├── in-memory       # Implementação de repositório para testes sem BD
│   └── prisma          # Implementação de repositório usando Prisma
├── use-cases           # Casos de uso (regras de negócio)
├── utils               # Funções auxiliares (formatadores, validadores)
├── app.ts              # Inicialização do Fastify e plugins
└── server.ts           # Entrada da aplicação (chama app.ts e inicia servidor)
```

---

## ⚙️ Scripts Disponíveis

No `package.json` você encontrará os seguintes scripts:

```json
"scripts": {
  "start:dev": "tsx watch src/server.ts",
  "start": "node build/server.js",
  "lint": "eslint --ext .ts src --fix",
  "test:create-prisma-environment": "npm link ./prisma/vitest-environment-prisma",
  "test:install-prisma-environment": "npm link vitest-environment-prisma",
  "build": "tsup src --out-dir build",
  "test": "vitest run --dir src/use-cases",
  "test:watch": "vitest --dir src/use-cases",
  "pretest:e2e": "run-s test:create-prisma-environment test:install-prisma-environment",
  "test:e2e": "vitest run --dir src/http",
  "test:e2e:watch": "vitest --dir src/http",
  "prisma:dev": "npx prisma migrate dev",
  "prisma:studio": "npx prisma studio"
}
```

Use:


- `npm run primsma:mdev` para rodar as migrations
- `npm run start:dev` para rodar em modo de desenvolvimento com hot reload.
- `npm run build && npm run start` para compilar e iniciar em produção.
- `npm run lint` para corrigir problemas de estilo.
- `npm run test` e `npm run test:e2e` para executar testes unitários e de integração.

---

## 🔧 Configurações de Ambiente

Crie um arquivo `.env` na raiz com as variáveis abaixo:

```dotenv
DATABASE_URL="postgresql://docker:docker@localhost:5432/organizer?schema=public"
NODE_ENV="dev"
PORT=8080
JWT_SECRET="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
```

- **DATABASE_URL**: string de conexão com o PostgreSQL.
- **NODE_ENV**: define o ambiente (`dev`, `production`, etc.).
- **PORT**: porta em que a API irá escutar.
- **JWT_SECRET**: segredo para assinatura de tokens JWT.

---

## 🔄 Rotas Existentes de Usuário

- `POST /users/register` — Registrar novo usuário.
- `POST /users/login` — Autenticar e receber access & refresh tokens.
- `POST /users/refresh` — Atualizar access token usando refresh token.
- `GET /users/me` — Obter informações do usuário autenticado.

---

## 📋 Tarefas e Casos de Uso (Eventos)

A próxima etapa do projeto é adicionar suporte a Eventos. As tarefas abaixo devem ser implementadas, seguindo o padrão atual de uso de Fastify, controllers, repositórios e testes:

1. **Modelagem da Entidade `Event` no Prisma**
   - Campos essenciais: `id`, `title`, `description`, `date`, `createdAt`, `updatedAt`.

2. **Criar as Rotas de Eventos**
   - `POST /events` — Criar um novo evento.
   - `GET /events` — Listar todos os eventos.
   - `POST /events/:id/subscribe` — Inscrever o usuário autenticado no evento.
   - `GET /events?fromDate=&toDate=&title=` — Listar eventos com filtros de data e/ou título.

3. **Implementar Casos de Uso (Use-Cases)**
   - `createEventUseCase` — Valida entrada e cria evento.
   - `listEventsUseCase` — Recebe filtros e retorna lista de eventos.
   - `subscribeEventUseCase` — Registra inscrição do usuário.

4. **Testes Unitários & E2E**
   - Criar testes unitários para cada use-case.
   - Criar testes de integração (E2E) para rotas HTTP de eventos.

---

## 🚀 Como Contribuir

1. Faça um fork deste repositório.
2. Crie uma branch: `git checkout -b feature/criar-eventos`.
3. Implemente as tasks e escreva testes.
4. Abra um pull request descrevendo suas alterações.

---

## 🎓 Boas Práticas

- Use sempre TypeScript e defina tipos para payloads.
- Mantenha controllers limpos, delegando lógica para use-cases.
- Teste suas funções e rotas.
- Faça commits atômicos e escreva mensagens descritivas.

---

# Vamos codar! 🎉


