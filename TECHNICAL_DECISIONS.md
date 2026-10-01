# Clínica API — Decisões Técnicas

Este documento registra decisões técnicas confirmadas do projeto.

## Backend

O backend utiliza:

* Node.js
* TypeScript
* Fastify

## Banco de dados

O projeto utiliza:

* Supabase
* PostgreSQL

O acesso ao banco é realizado através da configuração existente do Supabase.

## Validação

O projeto utiliza Zod para validação de dados e configuração quando aplicável.

## Inteligência Artificial

O projeto utiliza OpenAI para funcionalidades relacionadas ao atendimento automatizado.

A implementação relacionada à IA fica no módulo:

`src/modules/AI/`

Arquivos atualmente conhecidos:

* `ai.prompt.ts`
* `ai.service.ts`

## WhatsApp

A integração com WhatsApp utiliza Evolution API.

O backend recebe eventos através de webhook.

## Arquitetura

A separação principal utilizada pelo projeto é:

Routes → Controllers → Services → Repositories

## Princípios

* Preservar a arquitetura existente.
* Evitar alterações desnecessárias.
* Não criar abstrações sem necessidade.
* Não assumir comportamentos não confirmados.
* Preferir alterações pequenas e isoladas.
* Confirmar informações do banco antes de modificar operações relacionadas ao schema.

## Regra deste documento

Somente decisões técnicas confirmadas devem ser adicionadas aqui.

Problemas temporários, hipóteses, erros atuais e detalhes específicos de implementação devem permanecer fora deste documento.
