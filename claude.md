# Clínica API

## Stack

- Node.js
- TypeScript
- Fastify
- Supabase/PostgreSQL
- Zod
- OpenAI
- Evolution API

## Architecture

Use:

Routes → Controllers → Services → Repositories.

- Routes: HTTP routes and request definitions.
- Controllers: HTTP input/output handling.
- Services: business logic.
- Repositories: database access.

Keep business logic out of controllers and repositories.

## Main flow

WhatsApp → Evolution API → Webhook → Controller → Service → Repository → Supabase.

AI processing is handled by the AI module.

## Rules

- Follow existing project patterns before introducing new abstractions.
- Keep changes focused on the requested task.
- Do not refactor unrelated code.
- Validate external input with Zod.
- Never expose secrets or `.env` values.
- Do not modify `.env` unless explicitly requested.
- Do not invent database fields, tables, API behavior, or business rules.
- When database behavior is unclear, inspect the existing schema/migrations before changing code.

## Workflow

1. Inspect only the files relevant to the task.
2. Follow existing project patterns.
3. Make the smallest correct change.
4. Run the narrowest relevant validation.
5. Report changed files and validation results.

## Commands

- Development: `npm run dev`
- Build: `npm run build`
- Start: `npm start`