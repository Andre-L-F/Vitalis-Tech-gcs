export interface Equipe {
  id: number;
  nome: string;
  responsavel: string;
  telefoneContato: string;
  email: string;
  localizacaoAtual: string;
  status: string;
}

export interface CriarEquipe {
  nome: string;
  responsavel: string;
  telefoneContato: string;
  email: string;
  localizacaoAtual: string;
  status: string;
}