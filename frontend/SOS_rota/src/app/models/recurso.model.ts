export interface Recurso {
  id: number;
  nome: string;
  tipo: string;
  placa: string;
  status: string;
  baseAlocacao: string;
}

export interface CriarRecurso {
  nome: string;
  tipo: string;
  placa: string;
  status: string;
  baseAlocacao: string;
}