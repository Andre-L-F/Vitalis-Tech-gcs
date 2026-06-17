import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PessoaService } from '../../services/pessoa';
import { Pessoa } from '../../models/pessoa.model';

import { EquipeService } from '../../services/equipe';
import { CriarEquipe, Equipe } from '../../models/equipe.model';

interface VinculoEquipeLocal {
  equipeId: number;
  tipoEquipe: string;
  membrosIds: number[];
}

@Component({
  selector: 'app-equipes',
  imports: [FormsModule],
  templateUrl: './equipes.html',
  styleUrl: './equipes.css',
})
export class Equipes implements OnInit {
  private equipeService = inject(EquipeService);
  private pessoaService = inject(PessoaService);
  private cdr = inject(ChangeDetectorRef);

  private vinculosEquipesKey = 'sos_rota_equipes_vinculos';

  equipes: Equipe[] = [];
  pessoas: Pessoa[] = [];

  pessoaResponsavelId: number | null = null;
  equipeEditandoId: number | null = null;

  membrosSelecionadosIds: number[] = [];
  tipoEquipe = 'PADRAO';

  modalAberto = false;
  carregando = false;

  novaEquipe: CriarEquipe = this.criarFormularioInicial();

  ngOnInit(): void {
    this.carregarEquipes();
    this.carregarPessoas();
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

  carregarPessoas(): void {
    this.pessoaService.listar().subscribe({
      next: (dados) => {
        this.pessoas = dados.filter(
          (pessoa) => pessoa.status === 'DISPONIVEL'
        );

        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar pessoas:', erro);
      }
    });
  }

  abrirModal(): void {
    this.equipeEditandoId = null;
    this.pessoaResponsavelId = null;
    this.membrosSelecionadosIds = [];
    this.tipoEquipe = 'PADRAO';
    this.novaEquipe = this.criarFormularioInicial();

    this.modalAberto = true;
    this.cdr.detectChanges();
  }

  editarEquipe(equipe: Equipe): void {
    this.equipeEditandoId = equipe.id;

    const vinculo = this.buscarVinculoEquipe(equipe.id);

    this.tipoEquipe = vinculo?.tipoEquipe ?? 'PADRAO';
    this.membrosSelecionadosIds = vinculo?.membrosIds ?? this.obterIdsPeloResponsavel(equipe.responsavel);

    const pessoaResponsavel = this.pessoas.find(
      (pessoa) => pessoa.nome.trim().toLowerCase() === equipe.responsavel.trim().toLowerCase()
    );

    this.pessoaResponsavelId = pessoaResponsavel?.id ?? null;

    this.novaEquipe = {
      nome: equipe.nome,
      responsavel: equipe.responsavel,
      telefoneContato: equipe.telefoneContato,
      email: equipe.email,
      localizacaoAtual: 'Cidália',
      status: equipe.status
    };

    this.modalAberto = true;
    this.cdr.detectChanges();
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.equipeEditandoId = null;
    this.pessoaResponsavelId = null;
    this.membrosSelecionadosIds = [];
    this.tipoEquipe = 'PADRAO';
    this.novaEquipe = this.criarFormularioInicial();

    this.cdr.detectChanges();
  }

  alternarMembro(pessoaId: number, event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.checked) {
      if (!this.membrosSelecionadosIds.includes(pessoaId)) {
        this.membrosSelecionadosIds = [...this.membrosSelecionadosIds, pessoaId];
      }
    } else {
      this.membrosSelecionadosIds = this.membrosSelecionadosIds.filter(
        (id) => id !== pessoaId
      );

      if (this.pessoaResponsavelId === pessoaId) {
        this.pessoaResponsavelId = null;
        this.novaEquipe.responsavel = '';
        this.novaEquipe.telefoneContato = '';
        this.novaEquipe.email = '';
      }
    }

    this.cdr.detectChanges();
  }

  pessoaEstaSelecionada(pessoaId: number): boolean {
    return this.membrosSelecionadosIds.includes(pessoaId);
  }

  aoSelecionarResponsavel(): void {
    const pessoa = this.pessoas.find(
      (item) => item.id === Number(this.pessoaResponsavelId)
    );

    if (!pessoa) {
      this.novaEquipe.responsavel = '';
      this.novaEquipe.telefoneContato = '';
      this.novaEquipe.email = '';

      this.cdr.detectChanges();
      return;
    }

    if (!this.membrosSelecionadosIds.includes(pessoa.id)) {
      alert('O líder precisa fazer parte dos membros selecionados da equipe.');
      this.pessoaResponsavelId = null;
      this.novaEquipe.responsavel = '';
      this.novaEquipe.telefoneContato = '';
      this.novaEquipe.email = '';

      this.cdr.detectChanges();
      return;
    }

    this.novaEquipe.responsavel = pessoa.nome;
    this.novaEquipe.telefoneContato = pessoa.telefone;
    this.novaEquipe.email = pessoa.email;

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
    this.novaEquipe.localizacaoAtual = 'Cidália';

    if (this.equipeEditandoId === null) {
      this.novaEquipe.status = 'DISPONIVEL';
    }

    const telefoneBrasil = /^(\(?\d{2}\)?\s?)?\d{4,5}-\d{4}$/;
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.novaEquipe.nome) {
      alert('Informe o nome da equipe.');
      return;
    }

    if (!this.composicaoValida()) {
      return;
    }

    if (!this.novaEquipe.responsavel) {
      alert('Selecione o líder da equipe.');
      return;
    }

    if (!this.pessoaResponsavelId || !this.membrosSelecionadosIds.includes(this.pessoaResponsavelId)) {
      alert('O líder precisa estar entre os membros selecionados.');
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

    if (this.equipeEditandoId !== null) {
      this.atualizarEquipe();
      return;
    }

    this.criarEquipe();
  }

  criarEquipe(): void {
    this.equipeService.criar(this.novaEquipe).subscribe({
      next: (equipeSalva) => {
        this.salvarVinculoEquipe(equipeSalva.id);

        this.carregando = false;
        this.fecharModal();
        this.carregarEquipes();

        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao cadastrar equipe:', erro);

        this.carregando = false;
        this.cdr.detectChanges();

        alert('Erro ao cadastrar equipe. Verifique os dados informados.');
      }
    });
  }

  atualizarEquipe(): void {
    if (this.equipeEditandoId === null) {
      return;
    }

    this.equipeService.atualizar(this.equipeEditandoId, this.novaEquipe).subscribe({
      next: () => {
        if (this.equipeEditandoId !== null) {
          this.salvarVinculoEquipe(this.equipeEditandoId);
        }

        this.carregando = false;
        this.fecharModal();
        this.carregarEquipes();

        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao atualizar equipe:', erro);

        this.carregando = false;
        this.cdr.detectChanges();

        alert('Erro ao atualizar equipe. Verifique os dados informados.');
      }
    });
  }

  excluirEquipe(equipe: Equipe): void {
    if (!this.podeExcluirEquipe(equipe)) {
      alert(
        `Esta equipe não pode ser excluída porque está com status "${this.traduzirStatus(equipe.status)}". ` +
        'Somente equipes disponíveis podem ser excluídas.'
      );

      return;
    }

    const confirmar = confirm(
      `Deseja realmente excluir a equipe ${equipe.nome}?`
    );

    if (!confirmar) {
      return;
    }

    this.equipeService.excluir(equipe.id).subscribe({
      next: () => {
        this.removerVinculoEquipe(equipe.id);

        this.carregarEquipes();
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao excluir equipe:', erro);
        alert('Erro ao excluir equipe.');
      }
    });
  }

  podeExcluirEquipe(equipe: Equipe): boolean {
    return equipe.status === 'DISPONIVEL';
  }

  composicaoValida(): boolean {
    const quantidadeMinima = this.tipoEquipe === 'MOTOLANCIA' ? 1 : 2;

    if (this.membrosSelecionadosIds.length < quantidadeMinima) {
      if (this.tipoEquipe === 'MOTOLANCIA') {
        alert('Uma equipe de motolância precisa ter pelo menos 1 pessoa.');
      } else {
        alert('Uma equipe operacional precisa ter no mínimo 2 pessoas.');
      }

      return false;
    }

    return true;
  }

  contarPorStatus(status: string): number {
    return this.equipes.filter(
      (equipe) => equipe.status === status
    ).length;
  }

  membrosDaEquipe(equipe: Equipe): Pessoa[] {
    const vinculo = this.buscarVinculoEquipe(equipe.id);

    if (!vinculo) {
      return this.pessoas.filter(
        (pessoa) => pessoa.nome.trim().toLowerCase() === equipe.responsavel.trim().toLowerCase()
      );
    }

    return this.pessoas.filter(
      (pessoa) => vinculo.membrosIds.includes(pessoa.id)
    );
  }

  nomesMembrosDaEquipe(equipe: Equipe): string {
    const membros = this.membrosDaEquipe(equipe);

    if (membros.length === 0) {
      return 'Composição não definida';
    }

    return membros.map((membro) => membro.nome).join(', ');
  }

  quantidadeMembrosDaEquipe(equipe: Equipe): number {
    return this.membrosDaEquipe(equipe).length;
  }

  tipoDaEquipe(equipe: Equipe): string {
    const vinculo = this.buscarVinculoEquipe(equipe.id);

    if (vinculo?.tipoEquipe === 'MOTOLANCIA') {
      return 'Motolância';
    }

    return 'Operacional';
  }

  pessoasSelecionadas(): Pessoa[] {
    return this.pessoas.filter(
      (pessoa) => this.membrosSelecionadosIds.includes(pessoa.id)
    );
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

  private criarFormularioInicial(): CriarEquipe {
    return {
      nome: '',
      responsavel: '',
      telefoneContato: '',
      email: '',
      localizacaoAtual: 'Cidália',
      status: 'DISPONIVEL'
    };
  }

  private obterIdsPeloResponsavel(nomeResponsavel: string): number[] {
    const pessoa = this.pessoas.find(
      (item) => item.nome.trim().toLowerCase() === nomeResponsavel.trim().toLowerCase()
    );

    return pessoa ? [pessoa.id] : [];
  }

  private buscarVinculoEquipe(equipeId: number): VinculoEquipeLocal | null {
    return this.obterVinculosEquipes().find(
      (vinculo) => vinculo.equipeId === equipeId
    ) ?? null;
  }

  private salvarVinculoEquipe(equipeId: number): void {
    const vinculos = this.obterVinculosEquipes().filter(
      (vinculo) => vinculo.equipeId !== equipeId
    );

    vinculos.push({
      equipeId,
      tipoEquipe: this.tipoEquipe,
      membrosIds: this.membrosSelecionadosIds
    });

    this.salvarVinculosEquipes(vinculos);
  }

  private removerVinculoEquipe(equipeId: number): void {
    const vinculos = this.obterVinculosEquipes().filter(
      (vinculo) => vinculo.equipeId !== equipeId
    );

    this.salvarVinculosEquipes(vinculos);
  }

  private obterVinculosEquipes(): VinculoEquipeLocal[] {
    if (!this.localStorageDisponivel()) {
      return [];
    }

    const dados = localStorage.getItem(this.vinculosEquipesKey);

    if (!dados) {
      return [];
    }

    try {
      return JSON.parse(dados) as VinculoEquipeLocal[];
    } catch {
      return [];
    }
  }

  private salvarVinculosEquipes(vinculos: VinculoEquipeLocal[]): void {
    if (!this.localStorageDisponivel()) {
      return;
    }

    localStorage.setItem(
      this.vinculosEquipesKey,
      JSON.stringify(vinculos)
    );
  }

  private localStorageDisponivel(): boolean {
    return typeof localStorage !== 'undefined';
  }
}