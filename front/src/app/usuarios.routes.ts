import { Routes } from '@angular/router';

export const usuariosRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Tareas',
    loadComponent: () => import('./pages/usuarios/listar-usuarios/listar-usuarios.page'),
  },
  {
    path: 'create',
    title: 'Crear usuario',
    loadComponent: () => import('./pages/usuarios/crear-usuario/crear-usuario.page'),
  },

  {
    path: ':id_usuario',
    title: 'Editar usuario',
    loadComponent: () => import('./pages/usuarios/usuarios-editar/usuarios-editar.page'),
  },

  { path: '**', redirectTo: '' },
];

export default usuariosRoutes;
