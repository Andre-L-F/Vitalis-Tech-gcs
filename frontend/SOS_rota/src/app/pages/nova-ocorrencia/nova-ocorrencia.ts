import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nova-ocorrencia',
  imports: [FormsModule],
  templateUrl: './nova-ocorrencia.html',
  styleUrl: './nova-ocorrencia.css',
})
export class NovaOcorrencia {
  ocorrencia = {
    tipo: '',
    prioridade: '',
    endereco: '',
    descricao: '',
    equipe: '',
  };
}