import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { CriarOcorrencia, Ocorrencia } from '../models/ocorrencia.model';

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/ocorrencias`;

  private noCacheHeaders = new HttpHeaders({
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  });

  listar(): Observable<Ocorrencia[]> {
    return this.http.get<Ocorrencia[]>(
      `${this.apiUrl}?_t=${Date.now()}`,
      { headers: this.noCacheHeaders }
    );
  }

  criar(ocorrencia: CriarOcorrencia): Observable<Ocorrencia> {
    return this.http.post<Ocorrencia>(this.apiUrl, ocorrencia);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  encerrar(id: number): Observable<Ocorrencia> {
    return this.http.put<Ocorrencia>(`${this.apiUrl}/${id}/encerrar`, {});
  }
}