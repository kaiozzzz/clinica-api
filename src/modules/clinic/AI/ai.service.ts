import OpenAI from 'openai';
import { RECEPTIONIST_PROMPT } from './ai.prompt.js';
import { env } from '../../../env.js';
export class AIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
    });
  }  

  /**
   * Envia o histórico da conversa + a mensagem atual do paciente para a OpenAI
   * @param history Histórico de mensagens anteriores formatado
   * @param currentMessage Mensagem mais recente recebida
   */
  async generateResponse(
    history: Array<{ role: 'user' | 'assistant'; content: string }>,
    currentMessage: string
  ): Promise<string> {
    try {
      // Constrói a lista de mensagens para a API de Chat Completion
      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        { role: 'system', content: RECEPTIONIST_PROMPT },
        ...history.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        })),
        { role: 'user', content: currentMessage }
      ];

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7, // Mantém a resposta natural e levemente flexível
        max_tokens: 250   // Garante respostas objetivas para o WhatsApp
      });

      return response.choices[0]?.message?.content || 'Desculpe, tive um problema ao processar sua resposta. Pode repetir?';
    } catch (error) {
      console.error('Erro ao chamar OpenAI:', error);
      throw new Error('Falha ao gerar resposta da IA.');
    }
  }
}