import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Entrega } from '../../models/entrega.model';
import { EntregaService } from '../../services/entrega.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  standalone: false,
})
export class AdminComponent {
  entrega: Entrega = this.novaEntrega();
  salvando = false;
  sucesso = '';
  erro = '';

  readonly statusDisponiveis = ['PENDENTE', 'EM_TRANSPORTE', 'ENTREGUE', 'ATRASADA'];
  readonly riscosDisponiveis = ['BAIXO', 'MEDIO', 'ALTO'];

  constructor(private readonly entregaService: EntregaService) {}

  salvar(formulario: NgForm): void {
    if (formulario.invalid || this.salvando) {
      formulario.control.markAllAsTouched();
      return;
    }

    this.salvando = true;
    this.sucesso = '';
    this.erro = '';

    this.entregaService.criar(this.entrega).subscribe({
      next: () => {
        this.salvando = false;
        this.sucesso = 'Entrega cadastrada com sucesso.';
        this.entrega = this.novaEntrega();
        formulario.resetForm(this.entrega);
      },
      error: () => {
        this.salvando = false;
        this.erro = 'Não foi possível cadastrar a entrega. Revise os dados e tente novamente.';
      },
    });
  }

  private novaEntrega(): Entrega {
    return {
      numero: '',
      cliente: '',
      origem: '',
      destino: '',
      status: 'PENDENTE',
      risco: 'BAIXO',
      eta: '',
    };
  }
}
