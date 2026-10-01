// src/modules/clinic/chat/whatsapp.service.ts

import { env } from '../../../env.js';

export class WhatsAppService {
  async sendTextMessage(
    phone: string,
    message: string
  ): Promise<void> {
    const url =
      `${env.EVOLUTION_API_URL}/message/sendText/` +
      encodeURIComponent(env.EVOLUTION_INSTANCE_NAME);

    const response = await fetch(url, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        apikey: env.EVOLUTION_API_KEY,
      },

      body: JSON.stringify({
        number: phone,
        text: message,
        delay: 1000,
        linkPreview: false,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();

      console.error(
        '❌ Erro ao enviar mensagem pela Evolution:',
        response.status,
        errorBody
      );

      throw new Error(
        `Evolution API retornou status ${response.status}.`
      );
    }

    console.log(
      `✅ Mensagem enviada pela Evolution para ${phone}`
    );
  }
}