import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/auth/login/login.page';
import { authenticatedGuard } from './guards/authenticated-guard';
import { FotoPage } from './pages/foto/foto.page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', title: 'Home', component: HomePage },
  { path: 'foto', title: 'Foto', component: FotoPage },

  { path: 'login', title: 'Login', component: LoginPage },

  {
    path: 'tareas',
    canActivateChild: [authenticatedGuard],
    loadChildren: () => import('./tareas.routes'),
  },

  {
    path: 'usuarios',
    canActivateChild: [authenticatedGuard],
    loadChildren: () => import('./usuarios.routes'),
  },

  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.page'),
  },
];
