import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PessoaService } from '../../services/pessoa';
import { CriarPessoa, Pessoa } from '../../models/pessoa.model';

@Component({
  selector: 'app-pessoas',
  imports: [FormsModule],
  templateUrl: './pessoas.html',
  styleUrl: './pessoas.css',
})
export class Pessoas implements OnInit {
  private pessoaService = inject(PessoaService);
  private cdr = inject(ChangeDetectorRef);

  pessoas: Pessoa[] = [];

  pessoaEditandoId: number | null = null;

  modalAberto = false;
  carregando = false;

  novaPessoa: CriarPessoa = this.criarFormularioInicial();

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

  abrirModal(): void {
    this.pessoaEditandoId = null;
    this.novaPessoa = this.criarFormularioInicial();

    this.modalAberto = true;
    this.cdr.detectChanges();
  }

  editarPessoa(pessoa: Pessoa): void {
    this.pessoaEditandoId = pessoa.id;

    this.novaPessoa = {
      nome: pessoa.nome,
      cargo: pessoa.cargo,
      telefone: pessoa.telefone,
      email: pessoa.email,
      status: pessoa.status
    };

    this.modalAberto = true;
    this.cdr.detectChanges();
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.pessoaEditandoId = null;
    this.novaPessoa = this.criarFormularioInicial();

    this.cdr.detectChanges();
  }

  salvarPessoa(): void {
    if (this.carregando) {
      return;
    }

    this.novaPessoa.nome = this.novaPessoa.nome.trim();
    this.novaPessoa.cargo = this.novaPessoa.cargo.trim();
    this.novaPessoa.telefone = this.novaPessoa.telefone.trim();
    this.novaPessoa.email = this.novaPessoa.email.trim().toLowerCase();

    if (this.pessoaEditandoId === null) {
      this.novaPessoa.status = 'DISPONIVEL';
    }

    const telefoneBrasil = /^(\(?\d{2}\)?\s?)?\d{4,5}-\d{4}$/;
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.novaPessoa.nome) {
      alert('Informe o nome da pessoa.');
      return;
    }

    if (!this.novaPessoa.cargo) {
      alert('Informe o cargo da pessoa.');
      return;
    }

    if (!telefoneBrasil.test(this.novaPessoa.telefone)) {
      alert('Telefone inválido. Use um formato como: (11) 98765-4321.');
      return;
    }

    if (!emailValido.test(this.novaPessoa.email)) {
      alert('E-mail inválido.');
      return;
    }

    if (this.emailJaCadastrado()) {
      alert('Já existe uma pessoa cadastrada com este e-mail.');
      return;
    }

    this.carregando = true;
    this.cdr.detectChanges();

    if (this.pessoaEditandoId !== null) {
      this.atualizarPessoa();
      return;
    }

    this.criarPessoa();
  }

  criarPessoa(): void {
    this.pessoaService.criarSimulada(this.novaPessoa).subscribe({
      next: () => {
        this.carregando = false;
        this.fecharModal();
        this.carregarPessoas();

        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao simular cadastro de pessoa:', erro);

        this.carregando = false;
        this.cdr.detectChanges();

        alert('Erro ao cadastrar pessoa.');
      }
    });
  }

  atualizarPessoa(): void {
    if (this.pessoaEditandoId === null) {
      return;
    }

    this.pessoaService.atualizarSimulada(this.pessoaEditandoId, this.novaPessoa).subscribe({
      next: () => {
        this.carregando = false;
        this.fecharModal();
        this.carregarPessoas();

        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao simular atualização de pessoa:', erro);

        this.carregando = false;
        this.cdr.detectChanges();

        alert('Erro ao atualizar pessoa.');
      }
    });
  }

  excluirPessoa(pessoa: Pessoa): void {
    if (!this.podeExcluirPessoa(pessoa)) {
      alert(
        `Esta pessoa não pode ser excluída porque está com status "${this.traduzirStatus(pessoa.status)}". ` +
        'Somente pessoas disponíveis podem ser excluídas.'
      );

      return;
    }

    const confirmar = confirm(
      `Deseja realmente excluir ${pessoa.nome}?`
    );

    if (!confirmar) {
      return;
    }

    this.pessoaService.excluirSimulada(pessoa.id).subscribe({
      next: () => {
        this.carregarPessoas();
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao simular exclusão de pessoa:', erro);
        alert('Erro ao excluir pessoa.');
      }
    });
  }

  podeExcluirPessoa(pessoa: Pessoa): boolean {
    return pessoa.status === 'DISPONIVEL';
  }

  emailJaCadastrado(): boolean {
    const email = this.novaPessoa.email.trim().toLowerCase();

    return this.pessoas.some(
      (pessoa) =>
        pessoa.email.trim().toLowerCase() === email &&
        pessoa.id !== this.pessoaEditandoId
    );
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

  get pessoasIndisponiveis(): number {
    return this.pessoas.filter(
      (pessoa) => pessoa.status === 'INDISPONIVEL'
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

  private criarFormularioInicial(): CriarPessoa {
    return {
      nome: '',
      cargo: '',
      telefone: '',
      email: '',
      status: 'DISPONIVEL'
    };
  }
}