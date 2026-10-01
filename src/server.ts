// src/server.ts
import Fastify from 'fastify';
import { env } from './env.js';
import { webhookRoutes } from './modules/clinic/webhook/webhook.routes.js';

const app = Fastify({ logger: false });

// Registrar rotas de webhook
app.register(webhookRoutes);

const start = async () => {
  try {
    await app.listen({ port: env.PORT, host: '0.0.0.0' });
    console.log(`🚀 Servidor rodando na porta ${env.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();