import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, forkJoin, map, of } from 'rxjs';

import { OcorrenciaService } from '../../services/ocorrencia';
import { CriarOcorrencia } from '../../models/ocorrencia.model';

import { AmbulanciaService } from '../../services/ambulancia';
import { Recurso } from '../../models/recurso.model';

import { RotaService } from '../../services/rota';
import { Bairro, ResultadoRota } from '../../models/rota.model';

interface SugestaoRecurso {
  recurso: Recurso;
  origem: Bairro;
  destino: Bairro;
  resultado: ResultadoRota;
}

@Component({
  selector: 'app-nova-ocorrencia',
  imports: [FormsModule],
  templateUrl: './nova-ocorrencia.html',
  styleUrl: './nova-ocorrencia.css',
})
export class NovaOcorrencia implements OnInit {
  private ocorrenciaService = inject(OcorrenciaService);
  private ambulanciaService = inject(AmbulanciaService);
  private rotaService = inject(RotaService);
  private cdr = inject(ChangeDetectorRef);

  carregando = false;
  calculandoRecurso = false;

  mensagemErro = '';
  mensagemSucesso = '';
  mensagemSugestao = '';

  bairros: Bairro[] = [];
  cidadeFixa = 'Cidália';

  recursosDisponiveis: Recurso[] = [];

  melhorRecursoSugerido: SugestaoRecurso | null = null;
  sugestoesRecursos: SugestaoRecurso[] = [];

  origemChamado = '192 — SAMU';
  tipoOcorrencia = '';
  pontoReferencia = '';

  vitimaNome = '';
  vitimaIdade: string | number = '';
  vitimaSexo = 'Não informado';
  sintomas = '';

  ocorrencia: CriarOcorrencia = this.criarFormularioInicial();

  ngOnInit(): void {
    this.carregarBairros();
    this.carregarRecursosDisponiveis();
  }

  carregarBairros(): void {
    this.rotaService.listarBairros().subscribe({
      next: (dados) => {
        this.bairros = dados;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar bairros:', erro);
        this.mensagemErro = 'Erro ao carregar bairros do mapa tático.';
        this.cdr.detectChanges();
      }
    });
  }

  carregarRecursosDisponiveis(): void {
    this.ambulanciaService.listar().subscribe({
      next: (recursos) => {
        this.recursosDisponiveis = recursos.filter(
          (recurso) => recurso.status === 'DISPONIVEL'
        );

        if (this.ocorrencia.bairro) {
          this.calcularMelhorRecurso();
        }

        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar recursos disponíveis:', erro);
      }
    });
  }

  aoAlterarBairro(): void {
    this.melhorRecursoSugerido = null;
    this.sugestoesRecursos = [];
    this.mensagemSugestao = '';

    if (!this.ocorrencia.bairro) {
      this.cdr.detectChanges();
      return;
    }

    this.calcularMelhorRecurso();
  }

  calcularMelhorRecurso(): void {
    this.mensagemErro = '';
    this.mensagemSugestao = '';
    this.melhorRecursoSugerido = null;
    this.sugestoesRecursos = [];

    if (!this.ocorrencia.bairro) {
      return;
    }

    const destino = this.buscarBairroPorNome(this.ocorrencia.bairro);

    if (!destino) {
      this.mensagemSugestao = `O bairro "${this.ocorrencia.bairro}" não existe no grafo.`;
      this.cdr.detectChanges();
      return;
    }

    const recursosComBase = this.recursosDisponiveis.filter(
      (recurso) => recurso.baseAlocacao
    );

    if (recursosComBase.length === 0) {
      this.mensagemSugestao = 'Nenhum recurso disponível com base operacional cadastrada.';
      this.cdr.detectChanges();
      return;
    }

    const calculos = recursosComBase.map((recurso) => {
      const origem = this.buscarBairroPorNome(recurso.baseAlocacao);

      if (!origem) {
        return of(null);
      }

      return this.rotaService.calcularCaminho(origem.id, destino.id).pipe(
        map((resultado) => ({
          recurso,
          origem,
          destino,
          resultado
        } as SugestaoRecurso)),
        catchError(() => of(null))
      );
    });

    this.calculandoRecurso = true;
    this.cdr.detectChanges();

    forkJoin(calculos).subscribe({
      next: (respostas) => {
        const sugestoesValidas = respostas
          .filter((item): item is SugestaoRecurso => !!item && item.resultado.encontrado)
          .sort((a, b) => a.resultado.distanciaKm - b.resultado.distanciaKm);

        this.sugestoesRecursos = sugestoesValidas;
        this.melhorRecursoSugerido = sugestoesValidas[0] ?? null;

        if (!this.melhorRecursoSugerido) {
          this.mensagemSugestao = 'Não foi possível encontrar rota para os recursos disponíveis.';
        }

        this.calculandoRecurso = false;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao calcular melhor recurso:', erro);

        this.mensagemSugestao = 'Erro ao calcular o recurso mais próximo.';
        this.calculandoRecurso = false;

        this.cdr.detectChanges();
      }
    });
  }

  salvarOcorrencia(): void {
    this.mensagemErro = '';
    this.mensagemSucesso = '';

    if (this.carregando) {
      return;
    }

    this.normalizarCampos();

    if (!this.tipoOcorrencia) {
      this.exibirErro('Selecione o tipo da ocorrência.');
      return;
    }

    if (!this.ocorrencia.descricao) {
      this.exibirErro('Descreva a ocorrência.');
      return;
    }

    if (!this.ocorrencia.nomeSolicitante) {
      this.exibirErro('Informe o nome do solicitante.');
      return;
    }

    if (!this.ocorrencia.endereco) {
      this.exibirErro('Informe o endereço da ocorrência.');
      return;
    }

    if (!this.ocorrencia.bairro) {
      this.exibirErro('Selecione o bairro da ocorrência.');
      return;
    }

    if (this.calculandoRecurso) {
      this.exibirErro('Aguarde o cálculo da ambulância mais próxima.');
      return;
    }

    if (!this.melhorRecursoSugerido) {
      this.exibirErro('Nenhum recurso disponível foi selecionado para esta ocorrência.');
      return;
    }

    if (this.ocorrencia.cep && !/^\d{5}-\d{3}$/.test(this.ocorrencia.cep)) {
      this.exibirErro('CEP inválido. Use o formato 00000-000.');
      return;
    }

    if (
      this.ocorrencia.cpfSolicitante &&
      !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(this.ocorrencia.cpfSolicitante)
    ) {
      this.exibirErro('CPF inválido. Use o formato 000.000.000-00.');
      return;
    }

    if (
      this.ocorrencia.telefoneSolicitante &&
      !/^(\(?\d{2}\)?\s?)?\d{4,5}-\d{4}$/.test(this.ocorrencia.telefoneSolicitante)
    ) {
      this.exibirErro('Telefone inválido. Use um formato como: (11) 98765-4321.');
      return;
    }

    const payload: CriarOcorrencia = {
      ...this.ocorrencia,
      descricao: this.montarDescricaoCompleta()
    };

    console.log('Payload enviado para o backend:', payload);

    this.carregando = true;
    this.cdr.detectChanges();

    this.ocorrenciaService.criar(payload).subscribe({
      next: () => {
        this.carregando = false;
        this.limparFormulario();
        this.mensagemSucesso = 'Ocorrência cadastrada.';

        this.cdr.detectChanges();
      },

      error: (erro) => {
        console.error('Erro ao cadastrar ocorrência:', erro);

        this.carregando = false;
        this.mensagemErro = 'Erro ao cadastrar ocorrência. Verifique os dados ou o backend.';

        this.cdr.detectChanges();
      }
    });
  }

  private exibirErro(mensagem: string): void {
    this.mensagemErro = mensagem;
    this.carregando = false;
    this.cdr.detectChanges();
  }

  selecionarPrioridade(prioridade: string): void {
    this.ocorrencia.prioridade = prioridade;
    this.cdr.detectChanges();
  }

  limparFormulario(): void {
    this.origemChamado = '192 — SAMU';
    this.tipoOcorrencia = '';
    this.pontoReferencia = '';

    this.vitimaNome = '';
    this.vitimaIdade = '';
    this.vitimaSexo = 'Não informado';
    this.sintomas = '';

    this.melhorRecursoSugerido = null;
    this.sugestoesRecursos = [];
    this.mensagemSugestao = '';

    this.ocorrencia = this.criarFormularioInicial();

    this.cdr.detectChanges();
  }

  private criarFormularioInicial(): CriarOcorrencia {
    return {
      protocolo: this.gerarProtocolo(),
      descricao: '',
      endereco: '',
      bairro: null,
      cidade: this.cidadeFixa,
      cep: null,
      nomeSolicitante: '',
      cpfSolicitante: null,
      telefoneSolicitante: null,
      prioridade: 'ALTA'
    };
  }

  private gerarProtocolo(): string {
    const numero = Date.now() % 1000000;

    return `OCO-${String(numero).padStart(6, '0')}`;
  }

  private normalizarCampos(): void {
    this.ocorrencia.protocolo = this.ocorrencia.protocolo.trim().toUpperCase();
    this.ocorrencia.descricao = this.ocorrencia.descricao.trim();
    this.ocorrencia.endereco = this.ocorrencia.endereco.trim();
    this.ocorrencia.cidade = this.cidadeFixa;
    this.ocorrencia.nomeSolicitante = this.ocorrencia.nomeSolicitante.trim();

    this.ocorrencia.bairro = this.valorOuNull(this.ocorrencia.bairro);
    this.ocorrencia.cep = this.valorOuNull(this.ocorrencia.cep);
    this.ocorrencia.cpfSolicitante = this.valorOuNull(this.ocorrencia.cpfSolicitante);
    this.ocorrencia.telefoneSolicitante = this.valorOuNull(this.ocorrencia.telefoneSolicitante);

    this.tipoOcorrencia = this.tipoOcorrencia.trim();
    this.pontoReferencia = this.pontoReferencia.trim();
    this.vitimaNome = this.vitimaNome.trim();
    this.vitimaIdade = String(this.vitimaIdade ?? '').trim();
    this.sintomas = this.sintomas.trim();
  }

  private valorOuNull(valor: string | null): string | null {
    if (!valor || !valor.trim()) {
      return null;
    }

    return valor.trim();
  }

  private buscarBairroPorNome(nome: string): Bairro | null {
    const nomeNormalizado = nome.trim().toLowerCase();

    return this.bairros.find(
      (bairro) => bairro.nome.trim().toLowerCase() === nomeNormalizado
    ) ?? null;
  }

  private montarDescricaoCompleta(): string {
    const sugestao = this.melhorRecursoSugerido;

    const partes = [
      `Origem do chamado: ${this.origemChamado}`,
      `Tipo: ${this.tipoOcorrencia}`,
      `Relato: ${this.ocorrencia.descricao}`,
      this.sintomas ? `Queixa/Sintomas: ${this.sintomas}` : '',
      this.vitimaNome ? `Vítima: ${this.vitimaNome}` : '',
      this.vitimaIdade ? `Idade da vítima: ${this.vitimaIdade}` : '',
      this.vitimaSexo ? `Sexo da vítima: ${this.vitimaSexo}` : '',
      this.pontoReferencia ? `Ponto de referência: ${this.pontoReferencia}` : '',
      sugestao ? `Recurso sugerido: ${sugestao.recurso.nome}` : '',
      sugestao ? `Base do recurso: ${sugestao.origem.nome}` : '',
      sugestao ? `Destino: ${sugestao.destino.nome}` : '',
      sugestao ? `Distância: ${sugestao.resultado.distanciaKm} km` : '',
      sugestao ? `Rota Dijkstra: ${sugestao.resultado.rota}` : ''
    ];

    return partes.filter(Boolean).join(' | ');
  }
}