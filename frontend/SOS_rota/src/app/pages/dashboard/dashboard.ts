import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { OcorrenciaService } from '../../services/ocorrencia';
import { AmbulanciaService } from '../../services/ambulancia';
import { EquipeService } from '../../services/equipe';

import { Ocorrencia } from '../../models/ocorrencia.model';
import { Recurso } from '../../models/recurso.model';
import { Equipe } from '../../models/equipe.model';

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

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    console.log('Carregando dados reais do dashboard...');

    this.ocorrenciaService.listar().subscribe({
      next: (dados) => {
        this.ocorrencias = dados;
        console.log('Ocorrências carregadas:', dados);
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar ocorrências:', erro);
      }
    });

    this.ambulanciaService.listar().subscribe({
      next: (dados) => {
        this.recursos = dados;
        console.log('Recursos carregados:', dados);
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar recursos:', erro);
      }
    });

    this.equipeService.listar().subscribe({
      next: (dados) => {
        this.equipes = dados;
        console.log('Equipes carregadas:', dados);
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar equipes:', erro);
      }
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
    return [...this.ocorrencias]
      .reverse()
      .slice(0, 5);
  }

  get recursosRecentes(): Recurso[] {
    return this.recursos.slice(0, 4);
  }

  get equipesRecentes(): Equipe[] {
    return this.equipes.slice(0, 4);
  }

  traduzirPrioridade(prioridade: string): string {
    switch (prioridade) {
      case 'CRITICA':
        return 'Crítica';

      case 'ALTA':
        return 'Alta';

      case 'MEDIA':
        return 'Média';

      case 'BAIXA':
        return 'Baixa';

      default:
        return prioridade;
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
}