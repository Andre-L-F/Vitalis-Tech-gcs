import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { OcorrenciaService } from '../../services/ocorrencia';
import { AmbulanciaService } from '../../services/ambulancia';
import { EquipeService } from '../../services/equipe';

import { Ocorrencia } from '../../models/ocorrencia.model';
import { Recurso } from '../../models/recurso.model';
import { Equipe } from '../../models/equipe.model';

interface BairroMapa {
  id: number;
  nome: string;
  x: number;
  y: number;
}

interface ConexaoMapa {
  origem: number;
  destino: number;
  distancia: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private ocorrenciaService = inject(OcorrenciaService);
  private ambulanciaService = inject(AmbulanciaService);
  private equipeService = inject(EquipeService);
  private cdr = inject(ChangeDetectorRef);

  ocorrencias: Ocorrencia[] = [];
  recursos: Recurso[] = [];
  equipes: Equipe[] = [];

  bairrosMapa: BairroMapa[] = [
    { id: 1, nome: 'Jardim América', x: 150, y: 150 },
    { id: 2, nome: 'Centro', x: 350, y: 200 },
    { id: 3, nome: 'Setor Leste', x: 500, y: 150 },
    { id: 4, nome: 'Vila Nova', x: 250, y: 300 },
    { id: 5, nome: 'Alto da Serra', x: 600, y: 250 },
    { id: 6, nome: 'Setor Oeste', x: 550, y: 350 },
    { id: 7, nome: 'Distrito Industrial', x: 450, y: 400 },
    { id: 8, nome: 'Residencial Esperança', x: 150, y: 400 },
    { id: 9, nome: 'Recanto Verde', x: 400, y: 100 },
    { id: 10, nome: 'Ecoparque Sul', x: 200, y: 500 },
    { id: 11, nome: 'Nova Alvorada', x: 650, y: 450 },
    { id: 12, nome: 'Setor das Palmeiras', x: 100, y: 300 },
    { id: 13, nome: 'Colina Azul', x: 500, y: 300 },
    { id: 14, nome: 'Bela Vista', x: 350, y: 450 },
    { id: 15, nome: 'Morada do Sol', x: 700, y: 300 },
    { id: 16, nome: 'Setor Central II', x: 600, y: 100 },
    { id: 17, nome: 'Lago Azul', x: 300, y: 100 },
    { id: 18, nome: 'Residencial Florença', x: 400, y: 250 },
    { id: 19, nome: 'Setor Industrial Norte', x: 250, y: 450 },
    { id: 20, nome: 'Vale do Cerrado', x: 300, y: 350 },
  ];

  conexoesMapa: ConexaoMapa[] = [
    { origem: 9, destino: 16, distancia: 6.4 },
    { origem: 15, destino: 19, distancia: 8.3 },
    { origem: 7, destino: 17, distancia: 1.2 },
    { origem: 3, destino: 5, distancia: 12.2 },
    { origem: 4, destino: 12, distancia: 6.4 },
    { origem: 7, destino: 13, distancia: 9.2 },
    { origem: 6, destino: 13, distancia: 19.2 },
    { origem: 5, destino: 9, distancia: 13.2 },
    { origem: 3, destino: 16, distancia: 3.4 },
    { origem: 8, destino: 10, distancia: 12.8 },
    { origem: 1, destino: 20, distancia: 14.4 },
    { origem: 3, destino: 14, distancia: 18.1 },
    { origem: 2, destino: 18, distancia: 1.9 },
    { origem: 6, destino: 11, distancia: 15.7 },
    { origem: 1, destino: 17, distancia: 14.5 },
    { origem: 3, destino: 4, distancia: 3.0 },
    { origem: 14, destino: 19, distancia: 18.9 },
    { origem: 15, destino: 18, distancia: 18.5 },
    { origem: 2, destino: 20, distancia: 14.7 },
    { origem: 15, destino: 20, distancia: 12.7 },
    { origem: 15, destino: 17, distancia: 7.9 },
    { origem: 5, destino: 15, distancia: 8.6 },
    { origem: 2, destino: 6, distancia: 13.4 },
    { origem: 14, destino: 15, distancia: 9.4 },
    { origem: 3, destino: 9, distancia: 18.7 },
    { origem: 7, destino: 18, distancia: 1.7 },
    { origem: 9, destino: 18, distancia: 9.0 },
    { origem: 11, destino: 15, distancia: 18.3 },
    { origem: 2, destino: 7, distancia: 13.9 },
    { origem: 4, destino: 20, distancia: 7.7 },
    { origem: 5, destino: 16, distancia: 14.3 },
    { origem: 4, destino: 13, distancia: 12.8 },
    { origem: 1, destino: 16, distancia: 13.4 },
    { origem: 8, destino: 11, distancia: 16.6 },
    { origem: 10, destino: 11, distancia: 4.6 },
    { origem: 1, destino: 4, distancia: 7.0 },
    { origem: 7, destino: 11, distancia: 14.4 },
    { origem: 5, destino: 13, distancia: 6.2 },
    { origem: 9, destino: 20, distancia: 2.7 },
    { origem: 13, destino: 15, distancia: 8.3 },
    { origem: 13, destino: 17, distancia: 16.3 },
    { origem: 10, destino: 14, distancia: 7.9 },
    { origem: 1, destino: 8, distancia: 17.9 },
    { origem: 2, destino: 9, distancia: 19.3 },
    { origem: 16, destino: 17, distancia: 18.4 },
    { origem: 6, destino: 14, distancia: 9.0 },
    { origem: 2, destino: 19, distancia: 5.1 },
    { origem: 5, destino: 6, distancia: 1.3 },
    { origem: 1, destino: 2, distancia: 1.4 },
    { origem: 19, destino: 20, distancia: 3.7 },
    { origem: 4, destino: 8, distancia: 13.1 },
    { origem: 4, destino: 19, distancia: 3.8 },
    { origem: 11, destino: 16, distancia: 2.8 },
    { origem: 13, destino: 16, distancia: 7.8 },
  ];

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.ocorrenciaService.listar().subscribe({
      next: (dados) => {
        this.ocorrencias = dados;
        this.cdr.detectChanges();
      },
      error: (erro) => console.error('Erro ao carregar ocorrências:', erro)
    });

    this.ambulanciaService.listar().subscribe({
      next: (dados) => {
        this.recursos = dados;
        this.cdr.detectChanges();
      },
      error: (erro) => console.error('Erro ao carregar recursos:', erro)
    });

    this.equipeService.listar().subscribe({
      next: (dados) => {
        this.equipes = dados;
        this.cdr.detectChanges();
      },
      error: (erro) => console.error('Erro ao carregar equipes:', erro)
    });
  }

  get ocorrenciasAtivas(): number {
    return this.ocorrencias.filter(
      (ocorrencia) =>
        ocorrencia.status !== 'ENCERRADA' &&
        ocorrencia.status !== 'FINALIZADA' &&
        ocorrencia.status !== 'CONCLUIDA'
    ).length;
  }

  get recursosDisponiveis(): number {
    return this.recursos.filter(
      (recurso) => recurso.status === 'DISPONIVEL'
    ).length;
  }

  get equipesDisponiveis(): number {
    return this.equipes.filter(
      (equipe) => equipe.status === 'DISPONIVEL'
    ).length;
  }

  get ocorrenciasRecentes(): Ocorrencia[] {
    return [...this.ocorrencias].reverse().slice(0, 5);
  }

  get recursosRecentes(): Recurso[] {
    return this.recursos.slice(0, 4);
  }

  get equipesRecentes(): Equipe[] {
    return this.equipes.slice(0, 4);
  }

  obterPonto(id: number): BairroMapa {
    return this.bairrosMapa.find((bairro) => bairro.id === id)
      ?? { id, nome: `Bairro ${id}`, x: 0, y: 0 };
  }

  bairroTemRecursoDisponivel(nomeBairro: string): boolean {
    const bairro = this.normalizarTexto(nomeBairro);

    return this.recursos.some(
      (recurso) =>
        recurso.status === 'DISPONIVEL' &&
        this.normalizarTexto(recurso.baseAlocacao) === bairro
    );
  }

  bairroTemOcorrenciaAberta(nomeBairro: string): boolean {
    const bairro = this.normalizarTexto(nomeBairro);

    return this.ocorrencias.some(
      (ocorrencia) =>
        ocorrencia.status !== 'ENCERRADA' &&
        ocorrencia.status !== 'FINALIZADA' &&
        ocorrencia.status !== 'CONCLUIDA' &&
        ocorrencia.bairro &&
        this.normalizarTexto(ocorrencia.bairro) === bairro
    );
  }

  traduzirPrioridade(prioridade: string): string {
    switch (prioridade) {
      case 'CRITICA':
        return 'Crítica';

      case 'ALTA':
        return 'Grave';

      case 'MEDIA':
        return 'Média';

      case 'BAIXA':
        return 'Baixa';

      default:
        return prioridade;
    }
  }
  classePrioridade(prioridade: string): string {
    switch (prioridade) {
      case 'BAIXA':
        return 'priority-low';

      case 'MEDIA':
        return 'priority-medium';

      case 'ALTA':
        return 'priority-high';

      case 'CRITICA':
        return 'priority-critical';

      default:
        return 'priority-default';
    }
  }
  traduzirStatus(status: string): string {
    switch (status) {
      case 'DISPONIVEL':
        return 'Disponível';

      case 'EM_USO':
        return 'Em Uso';

      case 'MANUTENCAO':
        return 'Manutenção';

      case 'EM_ATENDIMENTO':
        return 'Em Atendimento';

      case 'EM_SAIDA':
        return 'Em Saída';

      case 'INDISPONIVEL':
        return 'Indisponível';

      case 'ABERTA':
        return 'Aberta';

      case 'EM_ANDAMENTO':
        return 'Em Andamento';

      case 'ENCERRADA':
        return 'Encerrada';

      default:
        return status;
    }
  }

  private normalizarTexto(valor: string | null | undefined): string {
    return String(valor ?? '').trim().toLowerCase();
  }
}