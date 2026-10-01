// src/modules/clinic/webhook/webhook.controller.ts

import { FastifyRequest, FastifyReply } from 'fastify';
import { ChatService } from '../chat/chat.service.js';
import { env } from '../../../env.js';
import { z } from 'zod';

const evolutionWebhookSchema = z.object({
  event: z.string(),
  instance: z.string(),

  data: z.object({
    key: z.object({
      remoteJid: z.string(),
      fromMe: z.boolean(),
    }),

    messageType: z.string().optional(),

    message: z
      .object({
        conversation: z.string().optional(),

        extendedTextMessage: z
          .object({
            text: z.string().optional(),
          })
          .optional()
          .nullable(),
      })
      .optional()
      .nullable(),
  }),
});

export class WebhookController {
  private chatService = new ChatService();

  async handleWhatsApp(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      console.log('1 - Entrou no WebhookController');

      const parseResult = evolutionWebhookSchema.safeParse(
        request.body
      );

      if (!parseResult.success) {
        console.log(
          '2 - Formato inválido:',
          parseResult.error.format()
        );

        return reply.status(200).send({
          status: 'ignored_format',
        });
      }

      console.log('2 - Formato do webhook válido');

      const { event, instance, data } = parseResult.data;

      console.log('3 - Evento recebido:', event);
      console.log('4 - Instância recebida:', instance);
      console.log(
        '5 - Instância configurada no .env:',
        env.EVOLUTION_INSTANCE_NAME
      );

      if (
        event !== 'messages.upsert' &&
        event !== 'MESSAGES_UPSERT'
      ) {
        console.log('❌ Parou: evento ignorado:', event);

        return reply.status(200).send({
          status: 'ignored_event',
        });
      }

      console.log('6 - Evento aceito');

      if (instance !== env.EVOLUTION_INSTANCE_NAME) {
        console.log('❌ Parou: instância diferente');
        console.log('Recebida:', instance);
        console.log(
          'Esperada:',
          env.EVOLUTION_INSTANCE_NAME
        );

        return reply.status(200).send({
          status: 'ignored_instance',
        });
      }

      console.log('7 - Instância aceita');

      const remoteJid = data.key.remoteJid;
      const isFromMe = data.key.fromMe;

      console.log('8 - remoteJid:', remoteJid);
      console.log('9 - fromMe:', isFromMe);

      if (isFromMe) {
        console.log(
          '❌ Parou: mensagem enviada pelo próprio número'
        );

        return reply.status(200).send({
          status: 'ignored_from_me',
        });
      }

      if (remoteJid.endsWith('@g.us')) {
        console.log('❌ Parou: mensagem de grupo');

        return reply.status(200).send({
          status: 'ignored_group',
        });
      }

      if (!remoteJid.endsWith('@s.whatsapp.net')) {
        console.log(
          '❌ Parou: formato de conversa não aceito:',
          remoteJid
        );

        return reply.status(200).send({
          status: 'ignored_remote_jid',
        });
      }

      const rawPhone = remoteJid.split('@')[0];

      console.log('10 - Número recebido:', rawPhone);
      console.log(
        '11 - Número autorizado:',
        env.ALLOWED_PHONE
      );

      if (rawPhone !== env.ALLOWED_PHONE) {
        console.log(
          '❌ Parou: número não autorizado'
        );

        return reply.status(200).send({
          status: 'ignored_phone',
        });
      }

      console.log('12 - Número autorizado');

      const messageText =
        data.message?.conversation ||
        data.message?.extendedTextMessage?.text;

      console.log('13 - Texto recebido:', messageText);

      if (!messageText) {
        console.log('❌ Parou: mensagem sem texto');

        return reply.status(200).send({
          status: 'no_text_content',
        });
      }

      console.log(
        `📥 Mensagem autorizada de ${rawPhone}: "${messageText}"`
      );

      const MVP_TENANT_ID =
        'f0920fc2-673c-4baa-8c60-79eebaf9d427';

      console.log('14 - Chamando o ChatService');

      const result = await this.chatService.registrarMensagem({
        clinicId: MVP_TENANT_ID,
        phone: rawPhone,
        sender: 'patient',
        message: messageText,
      });

      console.log('15 - ChatService finalizado');

      if (result.aiResponse) {
        console.log(
          `🤖 Resposta da Sofia: "${result.aiResponse}"`
        );
      }

      return reply.status(200).send({
        status: 'success',
        aiResponse: result.aiResponse,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro desconhecido';

      console.error(
        '❌ Erro no processamento do webhook:',
        errorMessage
      );

      return reply.status(500).send({
        error: 'Internal Server Error',
      });
    }
  }
}