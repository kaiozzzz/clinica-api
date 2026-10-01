# Clínica API — Contexto do Projeto

## Objetivo

Backend de uma solução de atendimento automatizado para clínicas através do WhatsApp.

O sistema recebe mensagens pelo WhatsApp, processa o atendimento, utiliza IA quando necessário e persiste informações no banco de dados.

## Stack

* Node.js
* TypeScript
* Fastify
* Supabase/PostgreSQL
* Zod
* OpenAI
* Evolution API

## Arquitetura

O projeto utiliza a separação:

Routes → Controllers → Services → Repositories

Responsabilidades:

* Routes: definição das rotas HTTP.
* Controllers: entrada e saída das requisições HTTP.
* Services: lógica de negócio e orquestração.
* Repositories: acesso e persistência de dados.

## Estrutura atual

```text
src/
├── env.ts
├── server.ts
├── config/
│   └── supabase.ts
└── modules/
    ├── clinic/
    │   ├── clinic.repository.ts
    │   └── clinic.service.ts
    ├── AI/
    │   ├── ai.prompt.ts
    │   └── ai.service.ts
    ├── chat/
    │   ├── chat.repository.ts
    │   ├── chat.service.ts
    │   └── whatsapp.service.ts
    └── webhook/
        ├── webhook.controller.ts
        └── webhook.routes.ts
```

## Principais módulos

### Clinic

Responsável pelas operações relacionadas à clínica e seus dados.

Arquivos atuais:

* `clinic.repository.ts`
* `clinic.service.ts`

### AI

Responsável pela configuração do prompt e pelo processamento relacionado à IA.

Arquivos atuais:

* `ai.prompt.ts`
* `ai.service.ts`

### Chat

Responsável pelo fluxo relacionado às conversas e integração do atendimento.

Arquivos atuais:

* `chat.repository.ts`
* `chat.service.ts`
* `whatsapp.service.ts`

### Webhook

Responsável pelo recebimento dos eventos enviados pela integração externa.

Arquivos atuais:

* `webhook.controller.ts`
* `webhook.routes.ts`

## Configuração

`src/env.ts`

Responsável pela leitura e validação das variáveis de ambiente utilizadas pela aplicação.

`src/config/supabase.ts`

Responsável pela configuração do cliente Supabase.

## Servidor

`src/server.ts`

Responsável pela inicialização do servidor Fastify e registro das rotas da aplicação.

## Fluxo geral conhecido

WhatsApp
→ Evolution API
→ Webhook
→ Controller
→ Service
→ Repository
→ Supabase

O fluxo também pode envolver o módulo de IA durante o processamento do atendimento.

## Estado atual

O projeto está em desenvolvimento.

A estrutura acima representa os arquivos existentes atualmente em `src/`.

Detalhes de implementação, schemas do banco, payloads, endpoints e regras de negócio devem ser obtidos diretamente dos arquivos relevantes quando uma tarefa exigir essas informações.

Não assumir comportamentos que não estejam confirmados pelo código ou pela documentação fornecida.

## Regra de desenvolvimento

Ao trabalhar neste projeto:

1. Identificar o objetivo exato da tarefa.
2. Analisar somente os arquivos relevantes.
3. Seguir a arquitetura e os padrões já existentes.
4. Fazer a menor alteração necessária.
5. Evitar refatorações não relacionadas.
6. Não inventar estruturas de banco, campos, endpoints ou comportamentos.
7. Solicitar apenas o contexto adicional necessário para resolver a tarefa.
