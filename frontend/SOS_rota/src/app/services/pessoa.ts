import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { CriarPessoa, Pessoa } from '../models/pessoa.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/pessoas`;

  private pessoasSimuladasKey = 'sos_rota_pessoas_simuladas';
  private pessoasOcultasKey = 'sos_rota_pessoas_ocultas';

  private noCacheHeaders = new HttpHeaders({
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  });

  listar(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(
      `${this.apiUrl}?_t=${Date.now()}`,
      { headers: this.noCacheHeaders }
    ).pipe(
      map((pessoasBackend) => this.aplicarSimulacaoLocal(pessoasBackend))
    );
  }

  criarSimulada(pessoa: CriarPessoa): Observable<Pessoa> {
    const pessoasSimuladas = this.obterPessoasSimuladas();

    const novaPessoa: Pessoa = {
      id: Date.now(),
      nome: pessoa.nome,
      cargo: pessoa.cargo,
      telefone: pessoa.telefone,
      email: pessoa.email,
      status: 'DISPONIVEL'
    };

    pessoasSimuladas.push(novaPessoa);

    this.salvarPessoasSimuladas(pessoasSimuladas);

    return of(novaPessoa);
  }

  atualizarSimulada(id: number, pessoa: CriarPessoa): Observable<Pessoa> {
    const pessoasSimuladas = this.obterPessoasSimuladas()
      .filter((item) => item.id !== id);

    const pessoaAtualizada: Pessoa = {
      id,
      nome: pessoa.nome,
      cargo: pessoa.cargo,
      telefone: pessoa.telefone,
      email: pessoa.email,
      status: pessoa.status || 'DISPONIVEL'
    };

    pessoasSimuladas.push(pessoaAtualizada);

    this.salvarPessoasSimuladas(pessoasSimuladas);

    return of(pessoaAtualizada);
  }

  excluirSimulada(id: number): Observable<void> {
    const pessoasSimuladas = this.obterPessoasSimuladas()
      .filter((pessoa) => pessoa.id !== id);

    this.salvarPessoasSimuladas(pessoasSimuladas);

    const idsOcultos = this.obterIdsOcultos();

    if (!idsOcultos.includes(id)) {
      idsOcultos.push(id);
    }

    this.salvarIdsOcultos(idsOcultos);

    return of(void 0);
  }

  private aplicarSimulacaoLocal(pessoasBackend: Pessoa[]): Pessoa[] {
    const idsOcultos = this.obterIdsOcultos();
    const pessoasSimuladas = this.obterPessoasSimuladas();

    const mapa = new Map<number, Pessoa>();

    pessoasBackend
      .filter((pessoa) => !idsOcultos.includes(pessoa.id))
      .forEach((pessoa) => mapa.set(pessoa.id, pessoa));

    pessoasSimuladas
      .filter((pessoa) => !idsOcultos.includes(pessoa.id))
      .forEach((pessoa) => mapa.set(pessoa.id, pessoa));

    return Array.from(mapa.values())
      .sort((a, b) => a.id - b.id);
  }

  private obterPessoasSimuladas(): Pessoa[] {
    if (!this.localStorageDisponivel()) {
      return [];
    }

    const dados = localStorage.getItem(this.pessoasSimuladasKey);

    if (!dados) {
      return [];
    }

    try {
      return JSON.parse(dados) as Pessoa[];
    } catch {
      return [];
    }
  }

  private salvarPessoasSimuladas(pessoas: Pessoa[]): void {
    if (!this.localStorageDisponivel()) {
      return;
    }

    localStorage.setItem(
      this.pessoasSimuladasKey,
      JSON.stringify(pessoas)
    );
  }

  private obterIdsOcultos(): number[] {
    if (!this.localStorageDisponivel()) {
      return [];
    }

    const dados = localStorage.getItem(this.pessoasOcultasKey);

    if (!dados) {
      return [];
    }

    try {
      return JSON.parse(dados) as number[];
    } catch {
      return [];
    }
  }

  private salvarIdsOcultos(ids: number[]): void {
    if (!this.localStorageDisponivel()) {
      return;
    }

    localStorage.setItem(
      this.pessoasOcultasKey,
      JSON.stringify(ids)
    );
  }

  private localStorageDisponivel(): boolean {
    return typeof localStorage !== 'undefined';
  }
}