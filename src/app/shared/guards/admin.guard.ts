import { inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const AdminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isAuthenticated() && auth.hasRole('admin')) { return true; }
  router.navigate(['/']);
  return false;
};
