import { Routes } from '@angular/router';
import { AppShell } from './layout/app-shell/app-shell';
import { Dashboard } from './pages/dashboard/dashboard';
import { Ambulancias } from './pages/ambulancias/ambulancias';
import { Equipes } from './pages/equipes/equipes';
import { Pessoas } from './pages/pessoas/pessoas';
import { NovaOcorrencia } from './pages/nova-ocorrencia/nova-ocorrencia';

export const routes: Routes = [
  {
    path: '',
    component: AppShell,
    children: [
      { path: '', component: Dashboard },
      { path: 'ambulancias', component: Ambulancias },
      { path: 'equipes', component: Equipes },
      { path: 'pessoas', component: Pessoas },
      { path: 'ocorrencias/nova', component: NovaOcorrencia },
    ],
  },
];