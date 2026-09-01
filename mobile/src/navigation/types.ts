import { Entrega } from '../models/Entrega';

export type RootStackParamList = {
  Home: undefined;
  Entregas: { refreshAt?: number } | undefined;
  DetalheEntrega: { entrega: Entrega };
  RegistrarOcorrencia: { entregaId: number };
};
