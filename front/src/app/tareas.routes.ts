import { Routes } from '@angular/router';

export const tareasRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Tareas',
    loadComponent: () => import('./pages/tareas/tareas-listar/tareas-listar.page'),
  },
  {
    path: 'create',
    title: 'Crear Tarea',
    loadComponent: () => import('./pages/tareas/tareas-crear/tareas-crear.page'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default tareasRoutes;
