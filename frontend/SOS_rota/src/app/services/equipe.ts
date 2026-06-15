import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { CriarEquipe, Equipe } from '../models/equipe.model';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/equipes`;

  private noCacheHeaders = new HttpHeaders({
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  });

  listar(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(
      `${this.apiUrl}?_t=${Date.now()}`,
      { headers: this.noCacheHeaders }
    );
  }

  criar(equipe: CriarEquipe): Observable<Equipe> {
    return this.http.post<Equipe>(this.apiUrl, equipe);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}