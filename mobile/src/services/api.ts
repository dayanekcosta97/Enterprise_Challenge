import { API_URL } from '../config/api';
import { Entrega, OcorrenciaInput } from '../models/Entrega';

const DEMO_CREDENTIALS_BASE64 = 'YWRtaW46YWRtaW4xMjM=';

function basicAuthorizationHeader(): string {
  return `Basic ${DEMO_CREDENTIALS_BASE64}`;
}

async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: basicAuthorizationHeader(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    let message = `Falha na API (${response.status})`;

    try {
      const body = (await response.json()) as { message?: string };
      if (body.message) {
        message = body.message;
      }
    } catch {
      // Mantém a mensagem padrão quando a resposta não contém JSON.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export function listarEntregas(): Promise<Entrega[]> {
  return apiRequest<Entrega[]>('/api/entregas');
}

export function registrarOcorrencia(ocorrencia: OcorrenciaInput): Promise<void> {
  return apiRequest<void>('/api/ocorrencias', {
    method: 'POST',
    body: JSON.stringify(ocorrencia),
  });
}
