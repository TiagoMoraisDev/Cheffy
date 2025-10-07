import { Routes } from '@angular/router';
import { App } from './app';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/painel/painel.component').then((m) => m.PainelComponent),
  },
  {
    path: 'historico',
    loadComponent: () =>
      import('./pages/historico/historico.component').then(
        (m) => m.HistoricoComponent
      ),
  },
  {
    path: 'gerenciar-menu',
    loadComponent: () =>
      import('./pages/gerenciar-menu/gerenciar-menu.component').then(
        (m) => m.GerenciarMenuComponent
      ),
  },
  {
    path: 'menu',
    loadComponent: () =>
      import('./pages/menu/menu.component').then((m) => m.MenuComponent),
  },
];
