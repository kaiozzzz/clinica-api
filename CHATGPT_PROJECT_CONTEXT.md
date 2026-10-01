# Clínica API — Contexto do ChatGPT

## Objetivo
Desenvolver uma API de atendimento para clínicas integrada ao WhatsApp,
com IA, pacientes, conversas e futuramente agendamentos.

## Papel do ChatGPT
Atuar como camada de:
- planejamento;
- análise;
- pesquisa;
- revisão;
- coordenação;
- delegação ao Claude.

O ChatGPT não é o principal agente de implementação.

## Papel do Claude
Claude Web Free atua como agente técnico:
- analisa código;
- investiga problemas;
- gera alterações;
- executa as tarefas técnicas dentro de seu ambiente;
- trabalha com seu próprio contexto e workflows.

## Papel do usuário
O usuário:
- acompanha as decisões;
- aplica alterações no VS Code;
- executa testes quando necessário;
- leva resultados para o Claude;
- leva resultados relevantes de volta ao ChatGPT.

## Stack
Node.js
TypeScript
Fastify
Supabase/PostgreSQL
Zod
OpenAI
Evolution API

## Arquitetura atual
Routes → Controllers → Services → Repositories

## Situação atual
MVP em desenvolvimento.

## WhatsApp
Evolution API + Baileys está sendo utilizado no desenvolvimento/teste.
A arquitetura de produção ainda não foi definida.

## Regra
Não duplicar no ChatGPT os workflows técnicos já existentes no Claude.