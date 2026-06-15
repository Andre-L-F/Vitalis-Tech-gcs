export interface Ocorrencia {
  id: number;
  protocolo: string;
  descricao: string;
  endereco: string;
  bairro: string | null;
  cidade: string;
  cep: string | null;
  nomeSolicitante: string;
  cpfSolicitante: string | null;
  telefoneSolicitante: string | null;
  prioridade: string;
  status: string;
  dataAbertura: string;
  dataEncerramento: string | null;
}

export interface CriarOcorrencia {
  protocolo: string;
  descricao: string;
  endereco: string;
  bairro: string | null;
  cidade: string;
  cep: string | null;
  nomeSolicitante: string;
  cpfSolicitante: string | null;
  telefoneSolicitante: string | null;
  prioridade: string;
}