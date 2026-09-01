import { Component, OnInit } from '@angular/core';

import { Entrega } from '../../models/entrega.model';
import { EntregaService } from '../../services/entrega.service';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html',
  styleUrl: './entregas.component.css',
  standalone: false,
})
export class EntregasComponent implements OnInit {
  entregas: Entrega[] = [];
  carregando = true;
  erro = '';
  excluindoId?: number;

  constructor(private readonly entregaService: EntregaService) {}

  ngOnInit(): void {
    this.carregarEntregas();
  }

  excluir(entrega: Entrega): void {
    if (!entrega.id || !window.confirm(`Excluir a entrega ${entrega.numero}?`)) {
      return;
    }

    this.excluindoId = entrega.id;
    this.erro = '';

    this.entregaService.excluir(entrega.id).subscribe({
      next: () => {
        this.entregas = this.entregas.filter((item) => item.id !== entrega.id);
        this.excluindoId = undefined;
      },
      error: () => {
        this.erro = `Não foi possível excluir a entrega ${entrega.numero}.`;
        this.excluindoId = undefined;
      },
    });
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
        this.erro = 'Não foi possível carregar as entregas. Verifique a conexão com a API.';
        this.carregando = false;
      },
    });
  }
}
