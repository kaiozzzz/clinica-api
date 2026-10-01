// src/env.ts

import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),

  SUPABASE_URL: z.string().url(),
  SUPABASE_KEY: z.string().min(1),

  OPENAI_API_KEY: z.string().min(1),

  EVOLUTION_API_URL: z.string().url(),
  EVOLUTION_API_KEY: z.string().min(1),
  EVOLUTION_INSTANCE_NAME: z.string().min(1),

  ALLOWED_PHONE: z.string().regex(/^\d+$/, {
    message:
      'ALLOWED_PHONE deve conter apenas números, incluindo 55 e o DDD.',
  }),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error(
    '❌ Erro de configuração nas variáveis de ambiente:',
    _env.error.format()
  );

  throw new Error('Variáveis de ambiente inválidas.');
}

export const env = _env.data;