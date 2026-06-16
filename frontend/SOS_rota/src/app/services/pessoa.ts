import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Pessoa } from '../models/pessoa.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/pessoas`;

  private noCacheHeaders = new HttpHeaders({
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  });

  listar(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(
      `${this.apiUrl}?_t=${Date.now()}`,
      { headers: this.noCacheHeaders }
    );
  }
}