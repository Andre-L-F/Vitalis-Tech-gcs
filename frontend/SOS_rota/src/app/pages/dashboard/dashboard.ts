import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  metricas = [
    {
      titulo: 'Ocorrências Ativas',
      valor: '18',
      icone: 'bi-exclamation-triangle',
      variacao: '+12% hoje',
      classe: 'danger',
    },
    {
      titulo: 'Equipes em Campo',
      valor: '7',
      icone: 'bi-people',
      variacao: '3 disponíveis',
      classe: 'info',
    },
    {
      titulo: 'Ambulâncias Livres',
      valor: '5',
      icone: 'bi-truck',
      variacao: 'de 12 unidades',
      classe: 'success',
    },
    {
      titulo: 'Tempo Médio',
      valor: '08m',
      icone: 'bi-clock-history',
      variacao: '-2m que ontem',
      classe: 'warning',
    },
  ];

  ocorrencias = [
    {
      codigo: 'OCR-1024',
      tipo: 'Acidente de trânsito',
      prioridade: 'Alta',
      local: 'Av. Brasil, Setor Central',
      status: 'Em atendimento',
      tempo: 'há 6 min',
    },
    {
      codigo: 'OCR-1025',
      tipo: 'Mal súbito',
      prioridade: 'Crítica',
      local: 'Rua 12, Jardim América',
      status: 'Equipe deslocada',
      tempo: 'há 9 min',
    },
    {
      codigo: 'OCR-1026',
      tipo: 'Incêndio residencial',
      prioridade: 'Alta',
      local: 'Setor Bueno',
      status: 'Aguardando apoio',
      tempo: 'há 14 min',
    },
  ];

  equipes = [
    { nome: 'Equipe Alfa', status: 'Em atendimento', unidade: 'USA-04' },
    { nome: 'Equipe Bravo', status: 'Disponível', unidade: 'USB-11' },
    { nome: 'Equipe Delta', status: 'Deslocamento', unidade: 'USA-02' },
  ];
}