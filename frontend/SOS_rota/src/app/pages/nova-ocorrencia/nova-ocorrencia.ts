import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { OcorrenciaService } from '../../services/ocorrencia';
import { CriarOcorrencia } from '../../models/ocorrencia.model';

import { AmbulanciaService } from '../../services/ambulancia';
import { Recurso } from '../../models/recurso.model';

@Component({
  selector: 'app-nova-ocorrencia',
  imports: [FormsModule],
  templateUrl: './nova-ocorrencia.html',
  styleUrl: './nova-ocorrencia.css',
})
export class NovaOcorrencia implements OnInit {
  private ocorrenciaService = inject(OcorrenciaService);
  private ambulanciaService = inject(AmbulanciaService);
  private cdr = inject(ChangeDetectorRef);

  carregando = false;

  mensagemErro = '';
  mensagemSucesso = '';

  recursosDisponiveis: Recurso[] = [];

  origemChamado = '192 — SAMU';
  tipoOcorrencia = '';
  pontoReferencia = '';

  vitimaNome = '';
  vitimaIdade: string | number = '';
  vitimaSexo = 'Não informado';
  sintomas = '';

  ocorrencia: CriarOcorrencia = this.criarFormularioInicial();

  ngOnInit(): void {
    this.carregarRecursosDisponiveis();
  }

  carregarRecursosDisponiveis(): void {
    this.ambulanciaService.listar().subscribe({
      next: (recursos) => {
        this.recursosDisponiveis = recursos.filter(
          (recurso) => recurso.status === 'DISPONIVEL'
        );

        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar recursos disponíveis:', erro);
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

    if (!this.ocorrencia.cidade) {
      this.exibirErro('Informe a cidade da ocorrência.');
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
        this.mensagemSucesso = 'Ocorrência cadastrada com sucesso.';

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

    this.ocorrencia = this.criarFormularioInicial();

    this.cdr.detectChanges();
  }

  private criarFormularioInicial(): CriarOcorrencia {
    return {
      protocolo: this.gerarProtocolo(),
      descricao: '',
      endereco: '',
      bairro: null,
      cidade: '',
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
    this.ocorrencia.cidade = this.ocorrencia.cidade.trim();
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

  private montarDescricaoCompleta(): string {
    const partes = [
      `Origem do chamado: ${this.origemChamado}`,
      `Tipo: ${this.tipoOcorrencia}`,
      `Relato: ${this.ocorrencia.descricao}`,
      this.sintomas ? `Queixa/Sintomas: ${this.sintomas}` : '',
      this.vitimaNome ? `Vítima: ${this.vitimaNome}` : '',
      this.vitimaIdade ? `Idade da vítima: ${this.vitimaIdade}` : '',
      this.vitimaSexo ? `Sexo da vítima: ${this.vitimaSexo}` : '',
      this.pontoReferencia ? `Ponto de referência: ${this.pontoReferencia}` : ''
    ];

    return partes.filter(Boolean).join(' | ');
  }
}