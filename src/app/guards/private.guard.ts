import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { QueryClient } from '@tanstack/angular-query-experimental';
import { AuthService } from '../services/auth.service';

export const privateGuard: CanActivateFn = async () => {
  const queryClient = inject(QueryClient);
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    await queryClient.fetchQuery({
      queryKey: ['me'],
      queryFn: () => authService.fetchMe(),
      staleTime: 5 * 60 * 1000,
    });
    return true;
  } catch {
    return router.createUrlTree(['/login']);
  }
};
