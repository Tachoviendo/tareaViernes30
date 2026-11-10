import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = inject(AuthService).token();

  if (!token) return next(req);

  const reqWithAuth = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`),
  });

  // return next(reqWithAuth);
  return next(reqWithAuth).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.doLogout(); // Limpia el token y el estado en el servicio
      }
      return throwError(() => error);
    }),
  );
};
