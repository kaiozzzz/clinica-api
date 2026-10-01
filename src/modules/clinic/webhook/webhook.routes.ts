// src/modules/clinic/webhook/webhook.routes.ts

import { FastifyInstance } from 'fastify';
import { WebhookController } from './webhook.controller.js';

const controller = new WebhookController();

export async function webhookRoutes(app: FastifyInstance) {
  app.post(
    '/webhook/whatsapp',
    async (request, reply) => {
      console.log('🔔 Webhook chegou ao Fastify');

      return controller.handleWhatsApp(request, reply);
    }
  );
}