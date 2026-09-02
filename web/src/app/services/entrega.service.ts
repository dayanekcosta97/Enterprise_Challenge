import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Entrega } from '../models/entrega.model';

@Injectable({ providedIn: 'root' })
export class EntregaService {
  private readonly apiUrl = '/api/entregas';

  // Credenciais fixas somente para o MVP acadêmico executado localmente.
  private readonly options = {
    headers: new HttpHeaders({
      Authorization: `Basic ${btoa('admin:admin123')}`,
      'Content-Type': 'application/json',
    }),
  };

  constructor(private readonly http: HttpClient) {}

  listar(): Observable<Entrega[]> {
    return this.http.get<Entrega[]>(this.apiUrl, this.options);
  }

  buscarPorId(id: number): Observable<Entrega> {
    return this.http.get<Entrega>(`${this.apiUrl}/${id}`, this.options);
  }

  criar(entrega: Entrega): Observable<Entrega> {
    return this.http.post<Entrega>(this.apiUrl, entrega, this.options);
  }

  atualizar(id: number, entrega: Entrega): Observable<Entrega> {
    return this.http.put<Entrega>(`${this.apiUrl}/${id}`, entrega, this.options);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.options);
  }
}
