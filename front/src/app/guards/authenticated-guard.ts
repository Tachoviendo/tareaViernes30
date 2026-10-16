import { inject } from '@angular/core';
import { CanActivateChildFn, Router, UrlSegmentGroup, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authenticatedGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.user();

  if (!user) {
    return router.createUrlTree(['/', 'login']);
  }
  return true;
};
