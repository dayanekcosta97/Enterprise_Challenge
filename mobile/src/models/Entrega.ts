export interface Entrega {
  id: number;
  numero: string;
  cliente: string;
  origem: string;
  destino: string;
  status: string;
  risco: string;
  eta: string;
}

export interface OcorrenciaInput {
  entregaId: number;
  tipo: string;
  severidade: string;
  descricao: string;
  tempoAdicionalMinutos: number;
}
