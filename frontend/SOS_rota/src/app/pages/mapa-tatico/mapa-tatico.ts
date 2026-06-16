import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, forkJoin, map, of } from 'rxjs';

import { RotaService } from '../../services/rota';
import { AmbulanciaService } from '../../services/ambulancia';
import { OcorrenciaService } from '../../services/ocorrencia';

import { Bairro, ResultadoRota } from '../../models/rota.model';
import { Recurso } from '../../models/recurso.model';
import { Ocorrencia } from '../../models/ocorrencia.model';

interface SugestaoRecurso {
  recurso: Recurso;
  origem: Bairro;
  destino: Bairro;
  resultado: ResultadoRota;
}

@Component({
  selector: 'app-mapa-tatico',
  imports: [FormsModule],
  templateUrl: './mapa-tatico.html',
  styleUrl: './mapa-tatico.css',
})
export class MapaTatico implements OnInit {
  private rotaService = inject(RotaService);
  private ambulanciaService = inject(AmbulanciaService);
  private ocorrenciaService = inject(OcorrenciaService);
  private cdr = inject(ChangeDetectorRef);

  bairros: Bairro[] = [];
  recursos: Recurso[] = [];
  ocorrencias: Ocorrencia[] = [];

  origemId: number | null = null;
  destinoId: number | null = null;
  ocorrenciaSelecionadaId: number | null = null;

  resultadoManual: ResultadoRota | null = null;
  melhorSugestao: SugestaoRecurso | null = null;
  sugestoes: SugestaoRecurso[] = [];

  carregandoRota = false;
  carregandoSugestao = false;

  mensagemErro = '';

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.mensagemErro = '';

    this.rotaService.listarBairros().subscribe({
      next: (dados) => {
        this.bairros = dados;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar bairros:', erro);
        this.mensagemErro = 'Erro ao carregar bairros do mapa.';
        this.cdr.detectChanges();
      }
    });

    this.ambulanciaService.listar().subscribe({
      next: (dados) => {
        this.recursos = dados;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar recursos:', erro);
      }
    });

    this.ocorrenciaService.listar().subscribe({
      next: (dados) => {
        this.ocorrencias = dados;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar ocorrências:', erro);
      }
    });
  }

  calcularRotaManual(): void {
    this.mensagemErro = '';
    this.resultadoManual = null;

    if (!this.origemId || !this.destinoId) {
      this.mensagemErro = 'Selecione origem e destino para calcular a rota.';
      return;
    }

    this.carregandoRota = true;
    this.cdr.detectChanges();

    this.rotaService.calcularCaminho(this.origemId, this.destinoId).subscribe({
      next: (resultado) => {
        this.resultadoManual = resultado;
        this.carregandoRota = false;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao calcular rota:', erro);
        this.mensagemErro = 'Erro ao calcular rota.';
        this.carregandoRota = false;
        this.cdr.detectChanges();
      }
    });
  }

  sugerirMelhorAmbulancia(): void {
    this.mensagemErro = '';
    this.melhorSugestao = null;
    this.sugestoes = [];

    const ocorrencia = this.ocorrencias.find(
      (item) => item.id === Number(this.ocorrenciaSelecionadaId)
    );

    if (!ocorrencia) {
      this.mensagemErro = 'Selecione uma ocorrência.';
      return;
    }

    if (!ocorrencia.bairro) {
      this.mensagemErro = 'A ocorrência selecionada não possui bairro compatível com o mapa.';
      return;
    }

    const destino = this.buscarBairroPorNome(ocorrencia.bairro);

    if (!destino) {
      this.mensagemErro = `O bairro "${ocorrencia.bairro}" não existe no grafo.`;
      return;
    }

    const recursosDisponiveis = this.recursos.filter(
      (recurso) =>
        recurso.status === 'DISPONIVEL' &&
        recurso.baseAlocacao
    );

    if (recursosDisponiveis.length === 0) {
      this.mensagemErro = 'Nenhum recurso disponível com base operacional cadastrada.';
      return;
    }

    const calculos = recursosDisponiveis.map((recurso) => {
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

    this.carregandoSugestao = true;
    this.cdr.detectChanges();

    forkJoin(calculos).subscribe({
      next: (respostas) => {
        const sugestoesValidas = respostas
          .filter((item): item is SugestaoRecurso => !!item && item.resultado.encontrado)
          .sort((a, b) => a.resultado.distanciaKm - b.resultado.distanciaKm);

        this.sugestoes = sugestoesValidas;
        this.melhorSugestao = sugestoesValidas[0] ?? null;

        if (!this.melhorSugestao) {
          this.mensagemErro = 'Não foi possível encontrar uma rota para os recursos disponíveis.';
        }

        this.carregandoSugestao = false;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao sugerir ambulância:', erro);
        this.mensagemErro = 'Erro ao calcular melhor ambulância.';
        this.carregandoSugestao = false;
        this.cdr.detectChanges();
      }
    });
  }

  buscarBairroPorNome(nome: string): Bairro | null {
    const nomeNormalizado = nome.trim().toLowerCase();

    return this.bairros.find(
      (bairro) => bairro.nome.trim().toLowerCase() === nomeNormalizado
    ) ?? null;
  }

  nomeBairroPorId(id: number): string {
    return this.bairros.find((bairro) => bairro.id === id)?.nome ?? `ID ${id}`;
  }

  get recursosDisponiveis(): Recurso[] {
    return this.recursos.filter(
      (recurso) => recurso.status === 'DISPONIVEL'
    );
  }

  get ocorrenciasAbertas(): Ocorrencia[] {
    return this.ocorrencias.filter(
      (ocorrencia) =>
        ocorrencia.status !== 'ENCERRADA' &&
        ocorrencia.status !== 'FINALIZADA' &&
        ocorrencia.status !== 'CONCLUIDA'
    );
  }
}