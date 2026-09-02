import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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
  erro = '';

  readonly statusDisponiveis = ['PENDENTE', 'EM_TRANSPORTE', 'ENTREGUE', 'ATRASADA'];
  readonly riscosDisponiveis = ['BAIXO', 'MEDIO', 'ALTO'];
  readonly etaMinima = this.formatarDataLocal(new Date());

  constructor(
    private readonly entregaService: EntregaService,
    private readonly router: Router,
  ) {}

  salvar(formulario: NgForm): void {
    if (formulario.invalid || this.salvando) {
      formulario.control.markAllAsTouched();
      return;
    }

    this.salvando = true;
    this.erro = '';

    this.entregaService.criar(this.entrega).subscribe({
      next: () => {
        this.salvando = false;
        void this.router.navigate(['/entregas']);
      },
      error: (erro: HttpErrorResponse) => {
        this.salvando = false;
        this.erro = this.obterMensagemErro(erro);
      },
    });
  }

  private obterMensagemErro(erro: HttpErrorResponse): string {
    if (erro.status === 0) {
      return 'A API está indisponível. Confirme se o backend está executando na porta 8080.';
    }

    const resposta = erro.error as {
      message?: string;
      validationErrors?: Record<string, string>;
    } | null;
    const validacoes = Object.values(resposta?.validationErrors ?? {});

    if (validacoes.length > 0) {
      return validacoes.join(' ');
    }

    return resposta?.message ?? `Não foi possível cadastrar a entrega (HTTP ${erro.status}).`;
  }

  private formatarDataLocal(data: Date): string {
    const deslocamento = data.getTimezoneOffset() * 60_000;
    return new Date(data.getTime() - deslocamento).toISOString().slice(0, 16);
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
