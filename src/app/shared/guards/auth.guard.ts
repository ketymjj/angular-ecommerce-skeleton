import { inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isAuthenticated()) { return true; }
  router.navigate(['/login']);
  return false;
};
