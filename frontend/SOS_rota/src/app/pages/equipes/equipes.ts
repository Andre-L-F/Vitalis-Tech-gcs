import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EquipeService } from '../../services/equipe';
import { CriarEquipe, Equipe } from '../../models/equipe.model';

@Component({
  selector: 'app-equipes',
  imports: [FormsModule],
  templateUrl: './equipes.html',
  styleUrl: './equipes.css',
})
export class Equipes implements OnInit {
  private equipeService = inject(EquipeService);
  private cdr = inject(ChangeDetectorRef);

  equipes: Equipe[] = [];

  modalAberto = false;
  carregando = false;

  novaEquipe: CriarEquipe = {
    nome: '',
    responsavel: '',
    telefoneContato: '',
    email: '',
    localizacaoAtual: '',
    status: 'DISPONIVEL'
  };

  ngOnInit(): void {
    this.carregarEquipes();
  }

  carregarEquipes(): void {
    this.equipeService.listar().subscribe({
      next: (dados) => {
        this.equipes = dados;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar equipes:', erro);
      }
    });
  }

  abrirModal(): void {
    this.modalAberto = true;
    this.cdr.detectChanges();
  }

  fecharModal(): void {
    this.modalAberto = false;

    this.novaEquipe = {
      nome: '',
      responsavel: '',
      telefoneContato: '',
      email: '',
      localizacaoAtual: '',
      status: 'DISPONIVEL'
    };

    this.cdr.detectChanges();
  }

  salvarEquipe(): void {
    if (this.carregando) {
      return;
    }

    this.novaEquipe.nome = this.novaEquipe.nome.trim().toUpperCase();
    this.novaEquipe.responsavel = this.novaEquipe.responsavel.trim();
    this.novaEquipe.telefoneContato = this.novaEquipe.telefoneContato.trim();
    this.novaEquipe.email = this.novaEquipe.email.trim().toLowerCase();
    this.novaEquipe.localizacaoAtual = this.novaEquipe.localizacaoAtual.trim();

    const telefoneBrasil = /^(\(?\d{2}\)?\s?)?\d{4,5}-\d{4}$/;
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.novaEquipe.nome) {
      alert('Informe o nome da equipe.');
      return;
    }

    if (!this.novaEquipe.responsavel) {
      alert('Informe o responsável pela equipe.');
      return;
    }

    if (!telefoneBrasil.test(this.novaEquipe.telefoneContato)) {
      alert('Telefone inválido. Use um formato como: (11) 98765-4321.');
      return;
    }

    if (!emailValido.test(this.novaEquipe.email)) {
      alert('E-mail inválido.');
      return;
    }

    this.carregando = true;
    this.cdr.detectChanges();

    this.equipeService.criar(this.novaEquipe).subscribe({
      next: () => {
        this.carregando = false;
        this.fecharModal();
        this.carregarEquipes();
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao salvar equipe:', erro);
        this.carregando = false;
        this.cdr.detectChanges();
        alert('Erro ao cadastrar equipe. Verifique os dados informados.');
      }
    });
  }

  excluirEquipe(id: number): void {
    const confirmar = confirm('Deseja realmente excluir esta equipe?');

    if (!confirmar) {
      return;
    }

    this.equipeService.excluir(id).subscribe({
      next: () => {
        this.carregarEquipes();
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao excluir equipe:', erro);
        alert('Erro ao excluir equipe.');
      }
    });
  }

  contarPorStatus(status: string): number {
    return this.equipes.filter(
      (equipe) => equipe.status === status
    ).length;
  }

  traduzirStatus(status: string): string {
    switch (status) {
      case 'DISPONIVEL':
        return 'Disponível';

      case 'EM_SAIDA':
        return 'Em Saída';

      case 'EM_ATENDIMENTO':
        return 'Em Atendimento';

      case 'INDISPONIVEL':
        return 'Indisponível';

      default:
        return status;
    }
  }
}