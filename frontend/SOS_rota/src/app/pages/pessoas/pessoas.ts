import { Component } from '@angular/core';

@Component({
  selector: 'app-pessoas',
  imports: [],
  templateUrl: './pessoas.html',
  styleUrl: './pessoas.css',
})
export class Pessoas {
  pessoas = [
    {
      nome: 'Mariana Rosa',
      cargo: 'Médica Reguladora',
      setor: 'Central 192',
      status: 'Ativo',
      contato: '(62) 99912-4587'
    },
    {
      nome: 'Carlos Mendes',
      cargo: 'Enfermeiro',
      setor: 'Equipe Bravo',
      status: 'Em atendimento',
      contato: '(62) 99844-1209'
    },
    {
      nome: 'Renato Lima',
      cargo: 'Condutor Socorrista',
      setor: 'Resgate',
      status: 'Ativo',
      contato: '(62) 99721-8840'
    }
  ];
}