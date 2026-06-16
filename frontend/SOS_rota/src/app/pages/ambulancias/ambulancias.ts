import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RotaService } from '../../services/rota';
import { Bairro } from '../../models/rota.model';
import { AmbulanciaService } from '../../services/ambulancia';
import { CriarRecurso, Recurso } from '../../models/recurso.model';

@Component({
  selector: 'app-ambulancias',
  imports: [FormsModule],
  templateUrl: './ambulancias.html',
  styleUrl: './ambulancias.css',
})
export class Ambulancias implements OnInit {
  private ambulanciaService = inject(AmbulanciaService);
  private cdr = inject(ChangeDetectorRef);

  private rotaService = inject(RotaService);

  bairros: Bairro[] = [];

  ambulancias: Recurso[] = [];

  modalAberto = false;
  carregando = false;

  novoRecurso: CriarRecurso = {
    nome: '',
    tipo: 'AMBULANCIA',
    placa: '',
    status: 'DISPONIVEL',
    baseAlocacao: ''
  };
  ngOnInit(): void {
    this.carregarBairros();
    this.carregarRecursos();
  }

carregarBairros(): void {
  this.rotaService.listarBairros().subscribe({
    next: (dados) => {
      this.bairros = dados;
      this.cdr.detectChanges();
    },
    error: (erro) => {
      console.error('Erro ao carregar bairros:', erro);
    }
  });
}

  carregarRecursos(): void {
    this.ambulanciaService.listar().subscribe({
      next: (dados) => {
        this.ambulancias = dados;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar recursos:', erro);
      }
    });
  }

  abrirModal(): void {
    this.modalAberto = true;
    this.cdr.detectChanges();
  }

  fecharModal(): void {
    this.modalAberto = false;

    this.novoRecurso = {
      nome: '',
      tipo: 'AMBULANCIA',
      placa: '',
      status: 'DISPONIVEL',
      baseAlocacao: ''
    };

    this.cdr.detectChanges();
  }

  salvarRecurso(): void {
    if (this.carregando) {
      return;
    }

    this.novoRecurso.nome = this.novoRecurso.nome.trim().toUpperCase();
    this.novoRecurso.placa = this.novoRecurso.placa.trim().toUpperCase();
    this.novoRecurso.baseAlocacao = this.novoRecurso.baseAlocacao.trim();

    const placaMercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;

    if (!this.novoRecurso.nome) {
      alert('Informe o nome do recurso.');
      return;
    }

    if (!placaMercosul.test(this.novoRecurso.placa)) {
      alert('Placa inválida. Use o padrão Mercosul: AAA1A11. Exemplo: ABC1D23.');
      return;
    }

    this.carregando = true;
    this.cdr.detectChanges();

    this.ambulanciaService.criar(this.novoRecurso).subscribe({
      next: () => {
        this.carregando = false;
        this.fecharModal();
        this.carregarRecursos();
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao salvar recurso:', erro);
        this.carregando = false;
        this.cdr.detectChanges();
        alert('Erro ao cadastrar recurso. Verifique os dados informados.');
      }
    });
  }

  excluirRecurso(id: number): void {
    const confirmar = confirm('Deseja realmente excluir este recurso?');

    if (!confirmar) {
      return;
    }

    this.ambulanciaService.excluir(id).subscribe({
      next: () => {
        this.carregarRecursos();
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao excluir recurso:', erro);
        alert('Erro ao excluir recurso.');
      }
    });
  }

  contarPorStatus(status: string): number {
    return this.ambulancias.filter(
      (ambulancia) => ambulancia.status === status
    ).length;
  }

  traduzirStatus(status: string): string {
    switch (status) {
      case 'DISPONIVEL':
        return 'Disponível';

      case 'EM_USO':
        return 'Em Uso';

      case 'MANUTENCAO':
        return 'Manutenção';

      default:
        return status;
    }
  }

  traduzirTipo(tipo: string): string {
    switch (tipo) {
      case 'AMBULANCIA':
        return 'Ambulância';

      case 'VIATURA':
        return 'Viatura';

      case 'MOTOLANCIA':
        return 'Motolância';

      case 'APOIO':
        return 'Apoio';

      default:
        return tipo;
    }
  }
}