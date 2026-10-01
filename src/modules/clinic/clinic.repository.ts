// src/modules/clinic/clinic.repository.ts
import { supabase } from '../../config/supabase.js';

export class ClinicRepository {
  async create(name: string, phone?: string) {
    const { data, error } = await supabase
      .from('clinics')
      .insert([{ name, phone }])
      .select()
      .single();

    if (error) throw new Error(`Erro ao criar clínica: ${error.message}`);
    return data;
  }

  async findById(id: string) {
    const { data, error } = await supabase
      .from('clinics')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  }
}