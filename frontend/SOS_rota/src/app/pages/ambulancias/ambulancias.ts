import { Component } from '@angular/core';

@Component({
  selector: 'app-ambulancias',
  imports: [],
  templateUrl: './ambulancias.html',
  styleUrl: './ambulancias.css',
})
export class Ambulancias {

  ambulancias = [
    {
      codigo: 'USA-04',
      tipo: 'UTI Móvel',
      status: 'Disponível',
      equipe: 'Equipe Alfa',
      localizacao: 'Base Central'
    },
    {
      codigo: 'USB-07',
      tipo: 'Suporte Básico',
      status: 'Em atendimento',
      equipe: 'Equipe Bravo',
      localizacao: 'Setor Oeste'
    },
    {
      codigo: 'RES-01',
      tipo: 'Resgate',
      status: 'Manutenção',
      equipe: 'Equipe Delta',
      localizacao: 'Oficina'
    }
  ];

}