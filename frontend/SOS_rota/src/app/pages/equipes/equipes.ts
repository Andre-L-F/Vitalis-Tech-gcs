import { Component } from '@angular/core';

@Component({
  selector: 'app-equipes',
  imports: [],
  templateUrl: './equipes.html',
  styleUrl: './equipes.css',
})
export class Equipes {
  equipes = [
    {
      codigo: 'ALFA-01',
      tipo: 'Atendimento Avançado',
      status: 'Em atendimento',
      responsavel: 'Dra. Mariana Rosa',
      unidade: 'USA-04'
    },
    {
      codigo: 'BRAVO-02',
      tipo: 'Suporte Básico',
      status: 'Disponível',
      responsavel: 'Enf. Carlos Mendes',
      unidade: 'USB-07'
    },
    {
      codigo: 'DELTA-03',
      tipo: 'Resgate',
      status: 'Deslocamento',
      responsavel: 'Sgt. Renato Lima',
      unidade: 'RES-01'
    }
  ];
}