import { Component, OnInit } from '@angular/core';

import { Entrega } from '../../models/entrega.model';
import { EntregaService } from '../../services/entrega.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: false,
})
export class HomeComponent implements OnInit {
  entregas: Entrega[] = [];
  carregando = true;
  erro = '';

  constructor(private readonly entregaService: EntregaService) {}

  ngOnInit(): void {
    this.carregarEntregas();
  }

  get totalEntregas(): number {
    return this.entregas.length;
  }

  get emTransporte(): number {
    return this.entregas.filter((entrega) => this.normalizar(entrega.status) === 'EM_TRANSPORTE')
      .length;
  }

  get emRiscoAlto(): number {
    return this.entregas.filter((entrega) => this.normalizar(entrega.risco) === 'ALTO').length;
  }

  get atrasadas(): number {
    const agora = Date.now();
    return this.entregas.filter((entrega) => {
      const status = this.normalizar(entrega.status);
      const eta = new Date(entrega.eta).getTime();
      return status.includes('ATRASAD') || (!Number.isNaN(eta) && eta < agora);
    }).length;
  }

  get entregasRecentes(): Entrega[] {
    return [...this.entregas]
      .sort((a, b) => (b.id ?? 0) - (a.id ?? 0))
      .slice(0, 5);
  }

  private carregarEntregas(): void {
    this.carregando = true;
    this.erro = '';

    this.entregaService.listar().subscribe({
      next: (entregas) => {
        this.entregas = entregas;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível carregar os dados. Confirme se o backend está ativo.';
        this.carregando = false;
      },
    });
  }

  private normalizar(valor: string): string {
    return valor.trim().toUpperCase().replaceAll(' ', '_');
  }
}
