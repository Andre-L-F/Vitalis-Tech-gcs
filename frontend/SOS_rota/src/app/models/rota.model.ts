export interface Bairro {
  id: number;
  nome: string;
}

export interface ResultadoRota {
  encontrado: boolean;
  distanciaKm: number;
  rota: string;
  caminhoIds: number[];
}