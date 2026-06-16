import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Bairro, ResultadoRota } from '../models/rota.model';

@Injectable({
  providedIn: 'root'
})
export class RotaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/rotas`;

  private noCacheHeaders = new HttpHeaders({
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  });

  listarBairros(): Observable<Bairro[]> {
    return this.http.get<Bairro[]>(
      `${this.apiUrl}/bairros?_t=${Date.now()}`,
      { headers: this.noCacheHeaders }
    );
  }

  calcularCaminho(origemId: number, destinoId: number): Observable<ResultadoRota> {
    return this.http.get<ResultadoRota>(
      `${this.apiUrl}/caminho?origem=${origemId}&destino=${destinoId}&_t=${Date.now()}`,
      { headers: this.noCacheHeaders }
    );
  }
}