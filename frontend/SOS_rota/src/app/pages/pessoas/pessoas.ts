import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';

import { PessoaService } from '../../services/pessoa';
import { Pessoa } from '../../models/pessoa.model';

@Component({
  selector: 'app-pessoas',
  imports: [],
  templateUrl: './pessoas.html',
  styleUrl: './pessoas.css',
})
export class Pessoas implements OnInit {
  private pessoaService = inject(PessoaService);
  private cdr = inject(ChangeDetectorRef);

  pessoas: Pessoa[] = [];

  ngOnInit(): void {
    this.carregarPessoas();
  }

  carregarPessoas(): void {
    this.pessoaService.listar().subscribe({
      next: (dados) => {
        this.pessoas = dados;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar pessoas:', erro);
      }
    });
  }

  get pessoasDisponiveis(): number {
    return this.pessoas.filter(
      (pessoa) => pessoa.status === 'DISPONIVEL'
    ).length;
  }

  get pessoasEmAtendimento(): number {
    return this.pessoas.filter(
      (pessoa) => pessoa.status === 'EM_ATENDIMENTO'
    ).length;
  }

  traduzirStatus(status: string): string {
    switch (status) {
      case 'DISPONIVEL':
        return 'Disponível';

      case 'EM_ATENDIMENTO':
        return 'Em Atendimento';

      case 'INDISPONIVEL':
        return 'Indisponível';

      default:
        return status;
    }
  }

  classeStatus(status: string): string {
    switch (status) {
      case 'DISPONIVEL':
        return 'status-success';

      case 'EM_ATENDIMENTO':
        return 'status-warning';

      case 'INDISPONIVEL':
        return 'status-danger';

      default:
        return 'status-default';
    }
  }
}