// src/modules/clinic/chat/chat.service.ts

import {
  ChatRepository,
  SaveMessageInput,
} from './chat.repository.js';

import { WhatsAppService } from './whatsapp.service.js';

export class ChatService {
  private repository = new ChatRepository();
  private whatsappService = new WhatsAppService();

  async registrarMensagem(data: SaveMessageInput) {
    console.log('1️⃣ Entrou no ChatService');

    // 1. Encontrar ou criar o paciente
    const patient = await this.repository.getOrCreatePatient(
      data.clinicId,
      data.phone
    );

    console.log('2️⃣ Paciente encontrado/criado:', patient.id);

    // 2. Salvar a mensagem recebida
    console.log('3️⃣ Salvando mensagem do paciente...');

    await this.repository.saveLog(
      data.clinicId,
      patient.id,
      data.sender,
      data.message
    );

    console.log('4️⃣ Mensagem salva com sucesso.');

    // 3. Se não for mensagem do paciente, não responder
    if (data.sender !== 'patient') {
      console.log('5️⃣ Não é mensagem do paciente. Encerrando.');

      return {
        patient,
        aiResponse: null,
      };
    }

    // 4. Resposta temporária
    const aiResponse =
      'Olá! Sou a Sofia. A integração com o WhatsApp está funcionando corretamente.';

    console.log('6️⃣ Resposta criada.');

    // 5. Salvar resposta da IA
    console.log('7️⃣ Salvando resposta da Sofia...');

    await this.repository.saveLog(
      data.clinicId,
      patient.id,
      'ai',
      aiResponse
    );

    console.log('8️⃣ Resposta salva.');

    // 6. Enviar pelo WhatsApp
    console.log('9️⃣ Enviando mensagem para Evolution...');

    try {
      await this.whatsappService.sendTextMessage(
        data.phone,
        aiResponse
      );

      console.log('🔟 Mensagem enviada com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao enviar mensagem pela Evolution:');
      console.error(error);

      throw error;
    }

    // 7. Retornar para o controller
    console.log('✅ Fluxo finalizado.');

    return {
      patient,
      aiResponse,
    };
  }
}