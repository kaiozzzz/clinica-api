// src/modules/clinic/clinic.service.ts
import { ClinicRepository } from './clinic.repository.js';

export class ClinicService {
  private repository = new ClinicRepository();

  async registrarClinica(name: string, phone?: string) {
    return await this.repository.create(name, phone);
  }

  async obterClinica(id: string) {
    const clinic = await this.repository.findById(id);
    if (!clinic) throw new Error('Clínica não encontrada.');
    return clinic;
  }
}