import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { CriarRecurso, Recurso } from '../models/recurso.model';

@Injectable({
  providedIn: 'root'
})
export class AmbulanciaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/recursos`;

  private noCacheHeaders = new HttpHeaders({
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  });

  listar(): Observable<Recurso[]> {
    return this.http.get<Recurso[]>(
      `${this.apiUrl}?_t=${Date.now()}`,
      { headers: this.noCacheHeaders }
    );
  }

  criar(recurso: CriarRecurso): Observable<Recurso> {
    return this.http.post<Recurso>(this.apiUrl, recurso);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}