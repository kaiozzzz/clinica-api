// src/modules/clinic/chat/chat.repository.ts
import { supabase } from '../../../config/supabase.js';

export interface SaveMessageInput {
  clinicId: string;
  phone: string;
  sender: 'patient' | 'ai' | 'system';
  message: string;
}

export class ChatRepository {
  async getOrCreatePatient(clinicId: string, phone: string) {
    const { data: patient, error: findError } = await supabase
      .from('patients')
      .select('*')
      .eq('tenant_id', clinicId)
      .eq('phone', phone)
      .maybeSingle();

    if (findError) {
      throw new Error(`Erro ao buscar paciente: ${findError.message}`);
    }

    if (patient) {
      return patient;
    }

    const { data: newPatient, error: insertError } = await supabase
      .from('patients')
      .insert([
        {
          tenant_id: clinicId,
          phone,
          name: `Paciente ${phone}`,
        },
      ])
      .select('*')
      .single();

    if (insertError) {
      throw new Error(`Erro ao criar paciente: ${insertError.message}`);
    }

    if (!newPatient) {
      throw new Error('O paciente foi criado, mas não foi retornado pelo Supabase.');
    }

    return newPatient;
  }

  async saveLog(
    clinicId: string,
    patientId: string,
    sender: 'patient' | 'ai' | 'system',
    message: string
  ) {
    const { data, error } = await supabase
      .from('chat_logs')
      .insert([
        {
          tenant_id: clinicId,
          patient_id: patientId,
          sender,
          message,
        },
      ])
      .select('*')
      .single();

    if (error) {
      throw new Error(`Erro ao salvar log de chat: ${error.message}`);
    }

    return data;
  }

  async getRecentLogs(patientId: string, limit: number = 10) {
    const { data, error } = await supabase
      .from('chat_logs')
      .select('sender, message, created_at')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Erro ao buscar histórico: ${error.message}`);
    }

    return (data ?? []).reverse();
  }
}